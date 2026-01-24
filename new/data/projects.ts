// Example projects data for the portfolio site
export type Project = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "urban-sketches",
    title: "Urban Sketches",
    description: "A series of documentary drawings from city life.",
    categories: ["documentary drawing", "personal work"],
    images: ["/images/urban1.jpg", "/images/urban2.jpg"],
  },
  {
    slug: "storybook-journey",
    title: "Storybook Journey",
    description: "Illustrations and comics for children’s books.",
    categories: ["books & comics", "illustration"],
    images: ["/images/storybook1.jpg"],
  },
  // Add more example projects as needed
];
