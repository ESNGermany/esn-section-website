/**
 * Directus interface for Code of Conduct (coc) item (one per section)
 */
export interface CocItem {
  data: {
    title: string;
    text: string;
  }[]
}
