import hoverClasses from '@/utils/styles/hoverClass';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'default' | 'ghost';
  fullWidth?: boolean;
  textSize?: string;
  padding?: string;
  margin?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  hoverEffect?: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'default',
  fullWidth = true,
  textSize = 'text-md',
  padding = 'py-3 px-4',
  margin = '',
  type = 'button',
  icon = '',
  hoverEffect = false,
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    default: 'bg-indigo-700 hover:bg-indigo-600 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };

  return (
    <button
      type={type}
      {...props}
      disabled={disabled}
      className={`group inline-flex h-12 items-center justify-center gap-x-2 rounded-md
      ${fullWidth ? 'w-full' : 'w-auto'}
      ${textSize} ${padding} ${margin}
      ${variants[variant]}
      ${hoverEffect && !disabled ? hoverClasses : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${props.className || ''}`}
    >
      {icon !== '' && <div className={icon} aria-hidden="true" />}

      <span className="flex-1 text-center font-bold">
        {children}
      </span>
    </button>
  );
};