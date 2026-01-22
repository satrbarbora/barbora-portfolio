import ProjectGrid from "@/components/ProjectGrid";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{ padding: '24px' }}>Loading...</div>}>
      <ProjectGrid locale="en" />
    </Suspense>
  );
}
