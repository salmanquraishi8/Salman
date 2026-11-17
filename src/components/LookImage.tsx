import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface LookImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  priority?: boolean;
}

export function LookImage({
  src,
  alt,
  fallbackTitle,
  className = '',
  priority = false,
}: LookImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#ECE9E1] via-[#E1DDD2] to-[#D4CFC2] dark:from-[#161B22] dark:via-[#1C222B] dark:to-[#11151B] p-6 text-center ${className}`}
      >
        <ImageOff
          className="h-6 w-6 text-[#6B675E] dark:text-[#9CA3AF]"
          aria-hidden="true"
        />
        <span className="font-display text-lg font-medium tracking-tight text-[#27272A] dark:text-[#E5E7EB]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
