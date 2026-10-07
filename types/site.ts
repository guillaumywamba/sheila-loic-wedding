export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type CountdownTarget = {
  date: string;
  time?: string;
};

export type HeroContent = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  ctaLabel: string;
  ctaHref: string;
  countdown: CountdownTarget;
};

export type WelcomeContent = {
  title: string;
  paragraphs: string[];
  signature: string;
  carouselImages: { url: string; alt: string }[];
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  location: string;
  image: string;
  imageAlt: string;
  logisticsTitle: string;
  logisticsDetails: string;
};

export type ColorSwatch = {
  hex: string;
  label?: string;
};

export type LogisticsContent = {
  title: string;
  weddingDates: string;
  venuesTitle: string;
  venuesLines: string[];
  dressCodeTitle: string;
  dressCode: string;
  colorPaletteTitle: string;
  colorPalette: ColorSwatch[];
  accommodationTitle: string;
  accommodationSubtitle: string;
  coupleImage: string;
  coupleImageAlt: string;
  tiers: AccommodationTier[];
};

export type AccommodationTier = {
  id: string;
  priceRange: string;
  hotels: {
    name: string;
    address: string;
    mapsUrl: string;
  }[];
};

export type BiographyContent = {
  title: string;
  coupleName: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
};

export type StoryContent = {
  title: string;
  paragraphs: string[];
};

export type GalleryContent = {
  title: string;
  subtitle: string;
  photos: { url: string; alt: string }[];
};

export type GiftPaymentMethod = {
  id: string;
  title: string;
  details: string;
  qrCodeUrl?: string;
  linkUrl?: string;
};

export type GiftsContent = {
  title: string;
  message: string;
  noPhysicalGiftsNote: string;
  paymentMethods: GiftPaymentMethod[];
};

export type RsvpContent = {
  title: string;
  description: string;
  deadlineNote: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
};

export type ContactContent = {
  title: string;
  organization: string;
  phone: string;
};

export type FooterContent = {
  copyright: string;
  credit: string;
};

export type SiteMeta = {
  title: string;
  description: string;
  logo: string;
};

export type SiteContent = {
  meta: SiteMeta;
  navigation: NavItem[];
  hero: HeroContent;
  welcome: WelcomeContent;
  events: {
    title: string;
    subtitle: string;
    items: EventItem[];
  };
  logistics: LogisticsContent;
  biography: BiographyContent;
  story: StoryContent;
  gallery: GalleryContent;
  gifts: GiftsContent;
  rsvp: RsvpContent;
  contact: ContactContent;
  footer: FooterContent;
};

export type RsvpSubmission = {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  attendance: "present" | "absent";
  message?: string;
  createdAt: string;
};
