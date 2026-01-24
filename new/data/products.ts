// Example products data for the shop
export type Product = {
  slug: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  sold: boolean;
};

export const products: Product[] = [
  {
    slug: "kvido-bowl",
    title: "KVIDO Pottery Bowl",
    description: "Handmade pottery bowl from the KVIDO collection.",
    price: 45,
    images: ["/images/kvido-bowl1.jpg", "/images/kvido-bowl2.jpg"],
    sold: false,
  },
  {
    slug: "storybook-mug",
    title: "Storybook Mug",
    description: "Ceramic mug with illustration from Storybook Journey.",
    price: 30,
    images: ["/images/storybook-mug1.jpg"],
    sold: true,
  },
  // Add more example products as needed
];
