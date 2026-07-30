import React from 'react';
import styles from './SecurityBar.module.css';

export interface SecurityBarProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

const DefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const SecurityBar: React.FC<SecurityBarProps> = ({
  message = 'Secure Connection. All data is encrypted.',
  icon = <DefaultIcon />,
  className = '',
}) => {
  return (
    <div className={`${styles.securityBar} ${className}`}>
      <div className={styles.iconWrapper}>{icon}</div>
      <span className={styles.message}>{message}</span>
    </div>
  );
};
