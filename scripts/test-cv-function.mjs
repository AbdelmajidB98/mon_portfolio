import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import cv from '../netlify/functions/cv.mjs';

const source = await readFile(join(process.cwd(), 'netlify', 'cv', 'Abdelmajid-Bouchoucha-CV.pdf'));

async function withNotificationMock(callback, values = {}) {
  const oldFetch = globalThis.fetch;
  const oldNetlify = globalThis.Netlify;
  const calls = [];
  globalThis.Netlify = {
    env: {
      get: (name) =>
        ({
          RESEND_API_KEY: 'test-key',
          CV_FROM_EMAIL: 'Portfolio <cv@example.com>',
          CV_NOTIFY_EMAIL: 'bouchouchaabdelmajid45@gmail.com',
          ...values,
        })[name],
    },
  };
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response('{"id":"test"}', { status: 200 });
  };
  try {
    await callback(calls);
  } finally {
    globalThis.fetch = oldFetch;
    globalThis.Netlify = oldNetlify;
  }
}

test('view serves the exact PDF inline and requests one email', async () => {
  await withNotificationMock(async (calls) => {
    const response = await cv(new Request('https://portfolio.example/api/cv?action=view'));
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-disposition'), /^inline;/);
    assert.equal(response.headers.get('content-type'), 'application/pdf');
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), source);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://api.resend.com/emails');
    const email = JSON.parse(calls[0].options.body);
    assert.deepEqual(email.to, ['bouchouchaabdelmajid45@gmail.com']);
    assert.match(email.subject, /consulté/);
  });
});

test('download serves the exact PDF as an attachment and labels the alert', async () => {
  await withNotificationMock(async (calls) => {
    const response = await cv(new Request('https://portfolio.example/api/cv?action=download'));
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-disposition'), /^attachment;/);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), source);
    assert.equal(calls.length, 1);
    assert.match(JSON.parse(calls[0].options.body).subject, /téléchargé/);
  });
});

test('invalid action, HEAD, prefetch and range requests do not send alerts', async () => {
  await withNotificationMock(async (calls) => {
    const url = 'https://portfolio.example/api/cv?action=view';
    assert.equal((await cv(new Request(`${url}x`))).status, 404);
    assert.equal((await cv(new Request(url, { method: 'HEAD' }))).status, 200);
    assert.equal((await cv(new Request(url, { headers: { Purpose: 'prefetch' } }))).status, 200);
    assert.equal((await cv(new Request(url, { headers: { Range: 'bytes=0-100' } }))).status, 200);
    assert.equal(calls.length, 0);
  });
});

test('the PDF remains available when email settings are missing', async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    await withNotificationMock(
      async (calls) => {
        const response = await cv(new Request('https://portfolio.example/api/cv?action=view'));
        assert.equal(response.status, 200);
        assert.equal(calls.length, 0);
      },
      { RESEND_API_KEY: '' },
    );
  } finally {
    console.warn = originalWarn;
  }
});
