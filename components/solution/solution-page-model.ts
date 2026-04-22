/** Product hero screenshot — same assets as `HOME_IN_ACTION_ITEMS` on the home page. */
export type SolutionHeroScreenshot = {
  imageLight: string;
  imageDark: string;
  alt: string;
  /** Fake browser chrome label (hero window). */
  chromeLabel?: string;
};

/** Content shape for `SolutionHeroSection` (interview, questionnaire, reports, …). */
export type SolutionHeroModel = {
  badge: string;
  titleLine1: string;
  titleLine2Prefix?: string;
  titleHighlight: string;
  titleLine2Suffix?: string;
  description: string;
  stats: readonly { value: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
};
