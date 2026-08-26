import type { ReactNode } from 'react';
import styles from './WorkspaceUI.module.css';

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  admin = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  action?: ReactNode;
  admin?: boolean;
}) {
  return (
    <div className={styles.pageHead}>
      <div>
        <span className={`${styles.subtitle} ${admin ? styles.adminSubtitle : ''}`}>{eyebrow}</span>
        <h1>{title}</h1>
        <p className={styles.muted}>{description}</p>
      </div>
      {action}
    </div>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return <span className={styles.gradient}>{children}</span>;
}

export function Button({
  children,
  variant = 'primary',
  small = false,
  type = 'button',
  onClick,
}: {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  small?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${small ? styles.small : ''}`}
    >
      {children}
    </button>
  );
}

export function Metric({
  label,
  value,
  note,
  admin = false,
}: {
  label: string;
  value: string;
  note: string;
  admin?: boolean;
}) {
  return (
    <div className={`${styles.metric} ${admin ? styles.adminCard : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

export function Card({
  children,
  accent = false,
  admin = false,
  className = '',
}: {
  children: ReactNode;
  accent?: boolean;
  admin?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`${styles.card} ${accent ? styles.accent : ''} ${admin ? styles.adminCard : ''} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  title,
  description,
  right,
}: {
  title: string;
  description?: string;
  right?: ReactNode;
}) {
  return (
    <div className={styles.sectionTitle}>
      <div>
        <h2>{title}</h2>
        {description && <p className={styles.muted}>{description}</p>}
      </div>
      {right}
    </div>
  );
}

export function Status({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: 'default' | 'live' | 'warning' | 'admin';
}) {
  return <span className={`${styles.status} ${styles[tone]}`}>{children}</span>;
}

export function Progress({ value }: { value: number }) {
  return (
    <div className={styles.progress}>
      <i style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function BarChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  return (
    <div className={styles.chart}>
      {labels.map((label, index) => (
        <div className={styles.chartColumn} key={`${label}-${index}`}>
          <i className={styles.chartBar} style={{ height: `${values[index] ?? 0}%` }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export { styles as workspaceStyles };
