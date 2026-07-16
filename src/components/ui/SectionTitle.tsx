import React from 'react';
import styles from './SectionTitle.module.css';

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.sectionTitle} ${className}`} {...props}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.underline} aria-hidden="true" />
    </div>
  );
};
