
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Project = {
  slug: string;
  title: string;
  categories: string[];
  imageUrl: string;
};

const MOCK_PROJECTS: Project[] = [
  {
    slug: "white-nights-deep-sleep",
    title: "White nights deep sleep",
    categories: ["documentary drawing", "books & comics"],
    imageUrl: "https://via.placeholder.com/600x400?text=Project+1",
  },
  {
    slug: "river-drawings",
    title: "River drawings",
    categories: ["documentary drawing", "personal work"],
    imageUrl: "https://via.placeholder.com/600x400?text=Project+2",
  },
  {
    slug: "odd-poster",
    title: "Odd poster",
    categories: ["odd design", "illustration"],
    imageUrl: "https://via.placeholder.com/600x400?text=Project+3",
  },
  {
    slug: "kvido-cups",
    title: "KVIDO cups",
    categories: ["KVIDO pottery"],
    imageUrl: "https://via.placeholder.com/600x400?text=Project+4",
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
    const base = pathname.startsWith("/(cz)") ? "/(en)/project" : "/(en)/project";
    // project detail is EN only
    router.push(`${base}/${slug}`);
  };

  return (
    <div>
      <div style={{ fontSize: "13px", marginBottom: "12px" }}>
        {category ? (
          <>Filter: <strong>{category}</strong></>
        ) : (
          <>All projects (newest first – mocked)</>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {filtered.map((project) => (
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
                aspectRatio: "4 / 3",
                backgroundImage: `url(${project.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginBottom: "8px",
              }}
            />
            <div style={{ fontSize: "13px" }}>{project.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
