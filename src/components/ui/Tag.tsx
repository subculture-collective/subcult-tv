interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'status' | 'tech';
  className?: string;
}

const variantStyles = {
  default: 'border-fog text-bone',
  status: 'border-static text-static',
  tech: 'border-scan text-scan',
};

export default function Tag({ children, variant = 'default', className = '' }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2 py-0.5
        text-xs font-mono uppercase tracking-wider
        border
        ${variantStyles[variant]}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}
