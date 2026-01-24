

"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Project = {
  slug: string;
  title: string;
  categories: string[];
  color: string;
  description?: string;
  images?: string[];
};

// Example project data array
const MOCK_PROJECTS: Project[] = [
  {
    slug: "river-drawings",
    title: "River drawings",
    categories: ["documentary drawing"],
    color: "#D4A5E8",
  },
  {
    slug: "urban-sketches",
    title: "Urban sketches",
    categories: ["documentary drawing"],
    color: "#B4D4E8",
  },
  {
    slug: "nature-studies",
    title: "Nature studies",
    categories: ["documentary drawing"],
    color: "#A5E8D4",
  },
  {
    slug: "daily-observations",
    title: "Daily observations",
    categories: ["documentary drawing"],
    color: "#D4E8A5",
  },
  // ...existing code...
  {
    slug: "visual-story",
    title: "Visual story",
    categories: ["books & comics"],
    color: "#FFF9C4",
  },
  {
    slug: "page-design",
    title: "Page design",
    categories: ["books & comics"],
    color: "#C5E1A5",
  },

  // Illustration
  {
    slug: "character-design",
    title: "Character design",
    categories: ["illustration"],
    color: "#B5EAD7",
  },
  {
    slug: "editorial-art",
    title: "Editorial art",
    categories: ["illustration"],
    color: "#A1D6D6",
  },
  {
    slug: "cover-art",
    title: "Cover art",
    categories: ["illustration"],
    color: "#7FD8D8",
  },
  {
    slug: "pattern-design",
    title: "Pattern design",
    categories: ["illustration"],
    color: "#73CDCD",
  },
  {
    slug: "digital-painting",
    title: "Digital painting",
    categories: ["illustration"],
    color: "#6BB7D6",
  },

  // Odd Design
  {
    slug: "odd-poster",
    title: "Odd poster",
    categories: ["odd design"],
    color: "#C9ADA7",
  },
  {
    slug: "experimental-layout",
    title: "Experimental layout",
    categories: ["odd design"],
    color: "#D4A5A5",
  },
  {
    slug: "unconventional-art",
    title: "Unconventional art",
    categories: ["odd design"],
    color: "#D9A5B5",
  },
  {
    slug: "surreal-design",
    title: "Surreal design",
    categories: ["odd design"],
    color: "#E5A5A5",
  },
  {
    slug: "abstract-concept",
    title: "Abstract concept",
    categories: ["odd design"],
    color: "#F0A5A5",
  },

  // Personal Work
  {
    slug: "personal-project-1",
    title: "Personal project 1",
    categories: ["personal work"],
    color: "#E0BBE4",
  },
  {
    slug: "personal-project-2",
    title: "Personal project 2",
    categories: ["personal work"],
    color: "#D5B7E4",
  },
  {
    slug: "personal-project-3",
    title: "Personal project 3",
    categories: ["personal work"],
    color: "#CAB3E4",
  },
  {
    slug: "personal-project-4",
    title: "Personal project 4",
    categories: ["personal work"],
    color: "#BF9FE4",
  },

  // KVIDO Pottery
  {
    slug: "kvido-cups",
    title: "KVIDO cups",
    categories: ["KVIDO pottery"],
    color: "#A8D8EA",
  },
  {
    slug: "kvido-bowls",
    title: "KVIDO bowls",
    categories: ["KVIDO pottery"],
    color: "#AA96DA",
  },
  {
    slug: "kvido-plates",
    title: "KVIDO plates",
    categories: ["KVIDO pottery"],
    color: "#FCBAD3",
  },
  {
    slug: "kvido-vases",
    title: "KVIDO vases",
    categories: ["KVIDO pottery"],
    color: "#F8B4D4",
  },
  {
    slug: "kvido-collection",
    title: "KVIDO collection",
    categories: ["KVIDO pottery"],
    color: "#F0AED8",
  },
];

export default function ProjectGrid({ locale }: { locale: "en" | "cz" }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = params.get("category");

  const filtered =
    category && category.length
      ? MOCK_PROJECTS.filter((p) => p.categories.includes(category))
      : MOCK_PROJECTS;

  const goToProject = (slug: string) => {
    if (category) {
      router.push(`/project/${slug}?category=${encodeURIComponent(category)}`);
    } else {
      router.push(`/project/${slug}`);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          div[style*='display: grid'] {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 700px) {
          div[style*='display: grid'] {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
            gap: 8px !important;
          }
        }
        @media (max-width: 500px) {
          div[style*='display: grid'] {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
        }
      `}</style>
        {filtered.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => goToProject(project.slug)}
            style={{
              border: "none",
              padding: 0,
              textAlign: "left",
              background: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                background: project.color,
              }}
            >
              {/* No image available, fallback to color background */}
            </div>
          </button>
        ))}
    </div>
  );
}
