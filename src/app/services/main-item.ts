/**
 * Directus interface for main information item (one per section)
 */
export interface MainItem {
  section_short_name: string;
  section_long_name: string;
  facebook_link: string;
  facebook_name: string;
  instagram_link: string;
  instagram_name: string;
  pretix_link: string;
  use_pretix_calendar: boolean;
  use_image_slideshow: boolean;
  address_name_first_line: string;
  address_street_second_line: string;
  address_city_third_line: string;
  address_email_fourth_line: string;
  welcome_message_front_page: string;
  button_color: string;
  eventpage_text: string;
  header_image: {
    id: string;
  };
  imagegrid_frontpage: [
    {
      id: string;
      directus_files_id: string;
      width: string;
    },
  ];
}
