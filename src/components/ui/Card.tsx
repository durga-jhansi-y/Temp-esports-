import React from 'react';
import styles from './Card.module.css';

// We drop the Omit entirely. Now 'title' remains the standard HTML string tooltip.
// We add 'heading' (or 'cardTitle') for your custom ReactNode component.
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode; 
  description?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  heading, 
  description,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {(heading || description) && (
        <div className={styles.header}>
          {/* Render the new 'heading' prop here */}
          {heading && <h3 className={styles.title}>{heading}</h3>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};