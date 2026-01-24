import Link from "next/link";
import Image from "next/image";
import { projects, Project } from "../data/projects";

export default function ProjectGrid({ category }: { category?: string }) {
  const filtered = category
    ? projects.filter((p) => p.categories.includes(category))
    : projects;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 32,
      margin: "0 auto",
      maxWidth: 1200,
      padding: "40px 32px"
    }}>
      {filtered.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", overflow: "hidden" }}>
            {project.images[0] && (
              <Image
                src={project.images[0]}
                alt={project.title}
                width={400}
                height={260}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />
            )}
            <div style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>{project.title}</div>
              <div style={{ color: "#444", fontSize: 15 }}>{project.description}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
