import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export function Badge({ children, variant = 'info' }: BadgeProps) {
  const variants = {
    success: 'bg-green-50 text-green-700 ring-green-600/20',
    error: 'bg-red-50 text-red-700 ring-red-600/20',
    warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  };

  return (
    <span className={`
      inline-flex items-center rounded-md px-2 py-1 text-xs font-medium
      ring-1 ring-inset ${variants[variant]}
    `}>
      <span className={`mr-1 h-1.5 w-1.5 rounded-full ${variant === 'success' ? 'bg-green-600' : 
        variant === 'error' ? 'bg-red-600' : 
        variant === 'warning' ? 'bg-yellow-600' : 
        'bg-blue-600'}`} />
      {children}
    </span>
  );
}