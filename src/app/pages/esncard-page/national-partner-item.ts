/**
 * Directus interface for national partner items
 */
export interface NationalPartnerItem {
  id: string;
  name: string;
  description: string;
  // Deal: string;
  link: string;
  logo: {
    id: string;
  };
  show: boolean;
  buttonText: string;
}
