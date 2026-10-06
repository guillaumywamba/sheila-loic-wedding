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
          <path d="M12 20s-6.5-4.2-6.5-9.5A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.5C18.5 15.8 12 20 12 20Z" />
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
          <path d="M6.5 5.5 9 3.5a2 2 0 0 1 2.2-.3l1.8 1a2 2 0 0 0 2.2 0l1.2-.7a2 2 0 0 1 2.7.9l1.1 2.2a11 11 0 0 1-5.2 7.4 11 11 0 0 1-7.4 2.2l-1.1-2.2a2 2 0 0 1 .8-2.6l1.2-.7a2 2 0 0 0 .9-2.2l-.3-1.8a2 2 0 0 1 1.1-1.9Z" />
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
