const registrationForm = {
  registrationForm: {
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    birth_date: "",
    gender: "",
    password: "",
    password_confirmation: "",
    tier_id: "",
  },
  shippingAddress: {
    address_line_1: "",
    country_id: "",
    state_id: "",
    city: "",
    zip_code: "",
    label_as: "home",
  },
  billingAddress: {
    same_as_shipping: 1,
    address_line_1: "",
    country_id: "",
    state_id: "",
    city: "",
    zip_code: "",
    label_as: "home",
  },
  shippingIsbilling: true,
};

export default registrationForm;
