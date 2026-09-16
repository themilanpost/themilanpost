/** Official social profiles: single source for homepage, about, etc. */

export interface SocialLink {
  label: string;
  href: string;
  /** Used for favicon fetch: `https://www.google.com/s2/favicons?domain=...` */
  faviconDomain: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Facebook group',
    href: 'https://www.facebook.com/groups/newinmilan',
    faviconDomain: 'facebook.com',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/themilanpost',
    faviconDomain: 'instagram.com',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@themilanpost',
    faviconDomain: 'tiktok.com',
  },
  {
    label: 'Linktree',
    href: 'https://linktr.ee/themilanpost',
    faviconDomain: 'linktr.ee',
  },
];

/** Tally quiz gate: pass → WhatsApp invite (configure endings in Tally). */
export const communityJoinFormId = 'Y56ZeN';

export const communityJoinUrl = `https://tally.so/r/${communityJoinFormId}`;

/**
 * Formspree form id (public endpoint id, not a secret).
 * Deliver-to address is set only in the Formspree dashboard (do not publish it in HTML).
 * Set PUBLIC_FORMSPREE_FORM_ID in `.env`.
 */
export const formspreeFormId = import.meta.env.PUBLIC_FORMSPREE_FORM_ID ?? '';

export const formspreeEndpoint = formspreeFormId
  ? `https://formspree.io/f/${formspreeFormId}`
  : '';

/** New in Milan public calendar (Luma embed). */
export const lumaCalendarEmbedSrc =
  'https://luma.com/embed/calendar/cal-HeuT9nx1d8erYKc/events?lt=light';

export const lumaCalendarUrl = 'https://lu.ma/newinmilan';

/** Homepage Instagram oEmbed permalinks (canonical /p/ or /reel/). */
export const instagramEmbedUrls = [
  'https://www.instagram.com/themilanpost/reel/DLijhYsszIX/',
  'https://www.instagram.com/themilanpost/p/DXWYByEjMbx/',
  'https://www.instagram.com/themilanpost/p/DXJRRFCjNd2/',
  'https://www.instagram.com/themilanpost/p/DWXOgcwjDNg/',
  'https://www.instagram.com/themilanpost/p/DUso8g8jIg-/',
] as const;

export const tiktokProfileUrl = 'https://www.tiktok.com/@themilanpost';
export const tiktokUsername = 'themilanpost';
