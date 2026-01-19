
const categories = [
  { title: "documentary drawing", value: "documentary-drawing" },
  { title: "books & comics", value: "books-comics" },
  { title: "illustration", value: "illustration" },
  { title: "odd design", value: "odd-design" },
  { title: "personal work", value: "personal-work" },
  { title: "KVIDO pottery", value: "kvido-pottery" },
];

export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title_en", title: "Title (EN)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title_en", maxLength: 96 } },
    {
      name: "description_en",
      title: "Description (EN)",
      type: "text",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: categories,
      },
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
  ],
};
