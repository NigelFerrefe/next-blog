import { MoonLoader } from 'react-spinners';
import useIsDarkMode from '../../hooks/useIsDarkMode';

interface ComponentProps {
    color?: string;
    size?: number
}


const LoadingMoon = ({color, size = 16} : ComponentProps) => {
  const isDark = useIsDarkMode();

  const loaderColor = color || isDark ? '#000' : '#fff';

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <MoonLoader color={loaderColor} size={size}></MoonLoader>
    </div>
  );
};

export default LoadingMoon;
