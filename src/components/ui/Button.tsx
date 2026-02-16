import { Link, type LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'signal' | 'scan' | 'static' | 'flicker';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button';
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<LinkProps, keyof ButtonBaseProps> & {
    as: 'link';
    to: string;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-scan text-glow hover:bg-scan-dim border-2 border-scan hover:border-scan-dim shadow-hard',
  secondary: 'bg-transparent text-bone border-2 border-scan hover:bg-scan hover:text-glow',
  ghost: 'bg-transparent text-bone hover:text-glow border-2 border-transparent hover:border-fog',
  signal: 'bg-transparent text-signal border-2 border-signal hover:bg-signal hover:text-void',
  scan: 'bg-scan text-glow hover:bg-scan-dim border-2 border-scan hover:border-scan-dim shadow-hard',
  static:
    'bg-signal text-void hover:bg-signal-dim border-2 border-signal hover:border-signal-dim shadow-hard',
  flicker:
    'bg-flicker text-void hover:bg-flicker-dim border-2 border-flicker hover:border-flicker-dim shadow-hard',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children, ...rest } = props;

  const baseStyles = `
    inline-flex items-center justify-center
    font-mono font-bold uppercase tracking-wider
    transition-all duration-200
    focus-visible:outline-2 focus-visible:outline-scan focus-visible:outline-offset-2
    cursor-pointer select-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  if (props.as === 'link') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      as: _as,
      to,
      ...linkRest
    } = rest as Omit<LinkProps, keyof ButtonBaseProps> & {
      as: 'link';
      to: string;
    };
    return (
      <Link to={to} className={baseStyles} {...linkRest}>
        {children}
      </Link>
    );
  }

  if (props.as === 'a') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      as: _as,
      href,
      ...anchorRest
    } = rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
      as: 'a';
      href: string;
    };
    return (
      <a href={href} className={baseStyles} {...anchorRest}>
        {children}
      </a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _as, ...buttonRest } = rest as Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonBaseProps
  > & { as?: 'button' };
  return (
    <button className={baseStyles} {...buttonRest}>
      {children}
    </button>
  );
}
