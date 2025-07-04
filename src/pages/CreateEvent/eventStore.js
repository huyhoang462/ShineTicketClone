import { signify } from "react-signify";
export const sEvent2 = signify({
  event_name: "",
  description: "",
  event_type_id: 1,
  event_format: "offline",
  start_date: "",
  end_date: "",
  total_tickets: 0,
  available_tickets: 0,
  organizer_name: "",
  organizer_info: "",
  organizer_email: "",
  organizer_phone_number: "",
  account_number: "",
  bank_name: "",
  owner_name: "",
  user_id: "",
  venue_name: "",
  street_name: "",
  ward: "",
  district: "",
  city: "",
  logo_url: null,
  cover_image_url: null,

  tickets: [],
});

export const sLocation = signify({
  province: "",
  province_code: 0,
  district: "",
  district_code: 0,
  ward: "",
  ward_code: 0,
});
