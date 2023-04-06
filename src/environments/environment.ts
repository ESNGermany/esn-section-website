// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  STRAPI_SECTION_URL: 'https://sections.esn-germany.de/website-',
  STRAPI_SECTION_URL_IMAGE: 'https://sections.esn-germany.de',
  SECTION_NAME: 'ESN Freiburg',
  DIRECTUS_URL_IMAGE: 'https://directus.esn-germany-testing.de/assets/',
  DIRECTUS_URL_FILES: 'https://directus.esn-germany-testing.de/files/',
  DIRECTUS_URL: 'https://directus.esn-germany-testing.de/items/website_',
  DIRECTUS_SECTION_FILTER: `?filter[section][name]=`,
  timeStamp: '2023-04-06 16:20:38',
};

// TODO: add list of sections that use the website live/testing
