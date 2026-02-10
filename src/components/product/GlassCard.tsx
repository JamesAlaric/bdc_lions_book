import type { ComponentChildren } from 'preact';
import type { CSSProperties } from 'preact/compat';

export interface GlassCardProps {
  children: ComponentChildren;
  variant?: 'red' | 'yellow';
  className?: string;
}

export function GlassCard({ children, variant = 'red', className = '' }: GlassCardProps) {
  const baseStyles: CSSProperties = {
    border: '1px solid rgba(148, 163, 184, 0.3)',
    boxShadow: '0 18px 32px rgba(15, 23, 42, 0.08)',
    borderRadius: '18px',
    padding: '20px',
    position: 'relative',
    background: '#ffffff',
    color: '#0f172a',
  };

  const variantStyles: CSSProperties =
    variant === 'red'
      ? {
          background: '#0f172a',
          color: '#f8fafc',
          border: '1px solid rgba(148, 163, 184, 0.2)',
        }
      : {
          background: '#f8fafc',
          color: '#0f172a',
          border: '1px solid rgba(148, 163, 184, 0.3)',
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
