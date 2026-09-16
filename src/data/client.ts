/**
 * Optional contact / org details for forms and SEO helpers.
 * Leave fields empty until real values are ready: do not use demo placeholders.
 */

export const client = {
  name: 'The Milan Post',
  email: '',
  phoneForTel: '',
  phoneFormatted: '',
  license: '',
  address: {
    lineOne: '',
    lineTwo: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    mapLink: '',
  },
  socials: {
    facebook: '',
    instagram: '',
    google: '',
  },
  domain: '',
} as const;

export type Client = typeof client;
