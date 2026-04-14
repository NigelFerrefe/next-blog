import InfoState from '@/components/ui/InfoState';

export default function NotFound() {
  return (
    <InfoState
      title="Page not found"
      description="The page you are looking for does not exist or has been deleted."
      buttonText="Go home"
      href="/"
    />
  );
}