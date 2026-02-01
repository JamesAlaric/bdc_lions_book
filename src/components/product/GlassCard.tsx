import type { ComponentChildren } from 'preact';
import type { CSSProperties } from 'preact/compat';

export interface GlassCardProps {
  children: ComponentChildren;
  variant?: 'red' | 'yellow';
  className?: string;
}

export function GlassCard({ children, variant = 'red', className = '' }: GlassCardProps) {
  const baseStyles: CSSProperties = {
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    padding: '24px',
  };

  const variantStyles: CSSProperties =
    variant === 'red'
      ? {
          background: 'rgba(255, 115, 35, 0.7)',
          color: '#ffffff',
        }
      : {
          background: 'rgba(255, 198, 39, 0.85)',
          color: '#1a1a1a',
        };

  return (
    <div
      className={`glass-card ${className}`}
      style={{
        ...baseStyles,
        ...variantStyles,
      }}
    >
      {children}
    </div>
  );
}
