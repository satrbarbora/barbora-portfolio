
export default {
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "instagram",
      title: "Instagram handle",
      type: "string",
    },
    {
      name: "body_en",
      title: "Body (EN)",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "body_cz",
      title: "Body (CZ)",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
