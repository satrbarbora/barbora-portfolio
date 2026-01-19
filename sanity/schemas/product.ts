
export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "name_en", title: "Name (EN)", type: "string" },
    { name: "name_cz", title: "Name (CZ)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name_en", maxLength: 96 } },
    {
      name: "description_en",
      title: "Description (EN)",
      type: "text",
    },
    {
      name: "description_cz",
      title: "Description (CZ)",
      type: "text",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Sold", value: "sold" },
        ],
      },
      initialValue: "available",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
};
