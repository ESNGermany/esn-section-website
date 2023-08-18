/**
 * Directus interface for content item
 */
export interface ContentItem {
  Title: string;
  Text: string;
  Layout:
    | 'Text_only'
    | 'Text_above_img_below'
    | 'Text_below_img_above'
    | 'Text_left_img_right'
    | 'Text_right_img_left';
  Wrap_in_shadow_box: boolean;
  Page_for_display:
    | 'Landing_page'
    | 'Members_page'
    | 'Team_page'
    | 'ESNcard_page'
    | 'Incomings_page';
  Order_on_page: number;
  Image: {
    id: string;
    width: number;
    height: number;
    description: string;
  };
}
