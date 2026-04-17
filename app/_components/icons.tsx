type IconProps = {
  className?: string;
};

export function LogoIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M10.8 20.4c2.9-1.1 4.8-3.4 5.8-6.9m0 0 4.6 2.4m-4.6-2.4-3.8-2.1m5.5 11.1 2.3-4.2m-11.3-.9 3.4-2.1m10-4.9a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m20 20-4.2-4.2M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BellIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 17H9m10-1.5c-1.1-1.1-1.5-2.3-1.5-4.5A5.5 5.5 0 0 0 6.5 11c0 2.2-.4 3.4-1.5 4.5-.6.6-.2 1.5.7 1.5h12.6c.9 0 1.3-.9.7-1.5ZM13.7 20a2 2 0 0 1-3.4 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2.8 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-2.9L6.4 20l1-6.2-4.5-4.4 6.3-.9L12 2.8Z" />
    </svg>
  );
}
