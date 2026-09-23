import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.section>
  );
}
export function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function TechBadge({ children }: { children: ReactNode }) {
  return <span className="tech-badge">{children}</span>;
}
export function TechStack({ items }: { items: string[] }) {
  return (
    <div className="tech-stack">
      {items.map((item) => (
        <TechBadge key={item}>{item}</TechBadge>
      ))}
    </div>
  );
}
