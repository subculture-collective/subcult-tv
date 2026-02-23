interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const THEME_BORDER_COLORS = [
  'border-fog',
  'border-signal',
  'border-static',
  'border-cyan',
  'border-flicker',
  'border-scan',
];

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  const hasBorderColor = THEME_BORDER_COLORS.some((c) => className.includes(c));
  return (
    <div
      className={`
        bg-ash border ${hasBorderColor ? '' : 'border-fog'}
        transition-all duration-200
        ${hoverable ? 'hover:border-signal hover:shadow-glow cursor-pointer' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
