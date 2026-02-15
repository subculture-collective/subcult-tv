interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div
      className={`
        bg-ash border border-fog
        transition-all duration-200
        ${hoverable ? 'hover:border-signal hover:shadow-glow cursor-pointer' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
