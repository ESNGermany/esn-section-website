export const environment = {
  production: true,
  enablePurge: true,
  STRAPI_SECTION_URL: 'https://sections.esn-germany.de/website-', // e.g. https://sections.esn-germany.de/esnfreiburg-
  STRAPI_SECTION_URL_IMAGE: 'https://sections.esn-germany.de',
  STRAPI_SECTION_ID: REPLACE_STRAPI_USER_ID,
  SECTION_NAME: REPLACE_SECTION_NAME,
  DIRECTUS_URL_IMAGE: 'https://directus.esn-germany.de/assets/',
  DIRECTUS_URL_FILES: 'https://directus.esn-germany.de/files/',
  DIRECTUS_URL_W: 'https://directus.esn-germany.de/items/Website_',
  DIRECTUS_URL_w: 'https://directus.esn-germany.de/items/website_',
  DIRECTUS_SECTION_FILTER: `?filter[section][name]=`,
  timeStamp: '2022-07-26 14:20:38',
};
