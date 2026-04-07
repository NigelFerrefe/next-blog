import hoverClasses from '@/utils/styles/hoverClass';

type ButtonProps = {
  children: React.ReactNode;
  textColor?: string;
  bgColor?: string;
  padding?: string;
  margin?: string;
  textSize?: string;
  type?: string;
  icon?: string;
  hoverEffect?: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  textColor = 'text-white dark:text-white',
  type = 'button',
  icon = '',
  textSize = 'text-md',
  bgColor = 'bg-indigo-700 hover:bg-indigo-300',
  padding = 'py-3 px-4',
  margin = '',
  hoverEffect = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      className={`group inline-flex h-12 w-full items-center justify-center gap-x-2 ${textColor} ${textSize} ${padding} ${bgColor} ${margin} ${
        hoverEffect && !disabled ? hoverClasses : ''
      } ${disabled ? 'bg-opacity-50 cursor-not-allowed' : ''} ${props.className || ''}`}
    >
      {icon !== '' && <div className={`${icon}`} aria-hidden="true" />}
      <span
        className={`flex-1 text-center font-bold ${
          hoverEffect && !disabled ? 'group-hover:text-black' : textColor
        }`}
      >
        {children}
      </span>
    </button>
  );
};
