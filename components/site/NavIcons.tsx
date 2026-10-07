type IconProps = { className?: string };

export function NavIcon({ id, className = "h-6 w-6" }: { id: string; className?: string }) {
  const props: IconProps = {
    className: `${className} shrink-0 stroke-current`,
  };

  switch (id) {
    case "accueil":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} {...props}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
        </svg>
      );
    case "evenements":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} {...props}>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M4 11h16" />
          <circle cx="8" cy="15" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="12" cy="15" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="16" cy="15" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
    case "logistique":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} {...props}>
          <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "histoire":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} {...props}>
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "galerie":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} {...props}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="m4 17 5-5 3 3 3-4 5 6" />
        </svg>
      );
    case "rsvp":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} {...props}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="m4 8 8 6 8-6" />
        </svg>
      );
    case "contact":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} {...props}>
          <path
            d="M5.5 4h2.2c.4 0 .8.2 1 .6l1.2 2.2a1 1 0 0 1-.2 1.1l-1.3 1.3a12 12 0 0 0 5.1 5.1l1.3-1.3a1 1 0 0 1 1.1-.2l2.2 1.2c.4.2.6.6.6 1V18a1.5 1.5 0 0 1-1.5 1.5C9.8 19.5 4.5 14.2 4.5 7A1.5 1.5 0 0 1 5.5 4Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
