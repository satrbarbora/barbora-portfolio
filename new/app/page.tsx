"use client";
import { Suspense } from "react";
import ProjectGrid from "../components/ProjectGrid";
import { useSearchParams } from "next/navigation";

function ProjectGridWithCategory() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  return <ProjectGrid category={category} />;
}

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <ProjectGridWithCategory />
      </Suspense>
    </div>
  );
}
// ...existing code...
