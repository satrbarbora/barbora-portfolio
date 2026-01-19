
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import project from "./schemas/project";
import product from "./schemas/product";
import about from "./schemas/about";
import contact from "./schemas/contact";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Barbora portfolio",
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: [project, product, about, contact],
  },
});
