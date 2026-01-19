
export default {
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
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
