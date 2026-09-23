import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const cvPath = join(process.cwd(), 'netlify', 'cv', 'Abdelmajid-Bouchoucha-CV.pdf');
const fileName = 'CV_AbdelmajidBouchoucha.pdf';

function setting(name) {
  return globalThis.Netlify?.env.get(name) ?? process.env[name];
}

async function notify(action, requestedAt) {
  const apiKey = setting('RESEND_API_KEY');
  const from = setting('CV_FROM_EMAIL');
  const to = setting('CV_NOTIFY_EMAIL');
  if (!apiKey || !from || !to) {
    console.warn('CV email notification is not configured.');
    return;
  }

  const verb = action === 'view' ? 'consulté' : 'téléchargé';
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Portfolio — CV ${verb}`,
        text: `Votre CV a été ${verb} depuis le portfolio le ${requestedAt} (UTC).`,
      }),
    });
    if (!response.ok) console.error(`CV email notification failed: HTTP ${response.status}`);
  } catch (error) {
    console.error('CV email notification failed:', error);
  }
}

export default async function cv(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  }

  const action = new URL(request.url).searchParams.get('action');
  if (action !== 'view' && action !== 'download') {
    return new Response('Not found', { status: 404 });
  }

  let pdf;
  try {
    pdf = await readFile(cvPath);
  } catch (error) {
    console.error('CV file unavailable:', error);
    return new Response('CV unavailable', { status: 404 });
  }

  const headers = {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `${action === 'view' ? 'inline' : 'attachment'}; filename="${fileName}"`,
    'Content-Length': String(pdf.byteLength),
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow',
  };
  if (request.method === 'HEAD') return new Response(null, { headers });

  const purpose = `${request.headers.get('Purpose') ?? ''} ${request.headers.get('Sec-Purpose') ?? ''}`;
  if (!purpose.includes('prefetch') && !request.headers.has('Range')) {
    await notify(action, new Date().toISOString());
  }

  return new Response(pdf, { headers });
}

export const config = { path: '/api/cv' };
