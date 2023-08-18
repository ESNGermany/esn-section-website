/**
 * Directus interface for partner items
 */
export interface PartnerItem {
  name: string;
  deal: string;
  link: string;
  order: number;
  main_image: {
    id: string;
  };
  buttonText: string;
  show: boolean;
}
