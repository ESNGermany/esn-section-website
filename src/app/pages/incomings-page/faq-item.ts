/**
 * Directus interface for FAQ items
 */
export interface FaqItem {
  question: string;
  answer: string;
  order_within_category: number;
  category: {
    category: string;
  };
}
