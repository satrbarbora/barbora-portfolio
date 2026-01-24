import Link from "next/link";
import { Suspense } from "react";

// Mock project data - in a real app this would come from a database
const PROJECTS: { [key: string]: any } = {
  "white-nights-deep-sleep": {
    title: "White nights deep sleep",
    description: "A collection of drawings exploring themes of rest and contemplation during the white nights.",
    images: ["#E8B4D4", "#D4A5E8", "#B4D4E8"],
  },
  "river-drawings": {
    title: "River drawings",
    description: "Studies of flowing water and riverside landscapes.",
    images: ["#D4A5E8", "#B4D4E8", "#A5E8D4"],
  },
  "urban-sketches": {
    title: "Urban sketches",
    description: "Quick drawings capturing urban environments and architecture.",
    images: ["#B4D4E8", "#A5E8D4", "#D4E8A5"],
  },
  "nature-studies": {
    title: "Nature studies",
    description: "Detailed observations of natural forms and landscapes.",
    images: ["#A5E8D4", "#D4E8A5", "#E8D4A5"],
  },
  "daily-observations": {
    title: "Daily observations",
    description: "Everyday moments captured through drawing.",
    images: ["#D4E8A5", "#E8D4A5", "#E8B4D4"],
  },
  "sketch-collection": {
    title: "Sketch collection",
    description: "A diverse collection of sketches and studies.",
    images: ["#E8D4A5", "#E8B4D4", "#D4A5E8"],
  },
  "comic-series": {
    title: "Comic series",
    description: "Sequential art telling visual stories.",
    images: ["#FFB3BA", "#FFCCCB", "#FFE0B2"],
  },
  "graphic-novel": {
    title: "Graphic novel",
    description: "A complete illustrated narrative.",
    images: ["#FFCCCB", "#FFE0B2", "#FFF9C4"],
  },
  "illustrated-book": {
    title: "Illustrated book",
    description: "Text and illustrations working together.",
    images: ["#FFE0B2", "#FFF9C4", "#C5E1A5"],
  },
  "visual-story": {
    title: "Visual story",
    description: "A story told primarily through images.",
    images: ["#FFF9C4", "#C5E1A5", "#FFB3BA"],
  },
  "page-design": {
    title: "Page design",
    description: "Carefully composed page layouts.",
    images: ["#C5E1A5", "#FFB3BA", "#FFCCCB"],
  },
  "character-design": {
    title: "Character design",
    description: "Development of unique characters.",
    images: ["#B5EAD7", "#A1D6D6", "#7FD8D8"],
  },
  "editorial-art": {
    title: "Editorial art",
    description: "Illustrations for publications.",
    images: ["#A1D6D6", "#7FD8D8", "#73CDCD"],
  },
  "cover-art": {
    title: "Cover art",
    description: "Eye-catching cover designs.",
    images: ["#7FD8D8", "#73CDCD", "#6BB7D6"],
  },
  "pattern-design": {
    title: "Pattern design",
    description: "Repeating patterns and decorative designs.",
    images: ["#73CDCD", "#6BB7D6", "#B5EAD7"],
  },
  "digital-painting": {
    title: "Digital painting",
    description: "Digital artwork and paintings.",
    images: ["#6BB7D6", "#B5EAD7", "#A1D6D6"],
  },
  "odd-poster": {
    title: "Odd poster",
    description: "Unconventional poster designs.",
    images: ["#C9ADA7", "#D4A5A5", "#D9A5B5"],
  },
  "experimental-layout": {
    title: "Experimental layout",
    description: "Playing with unconventional layouts.",
    images: ["#D4A5A5", "#D9A5B5", "#E5A5A5"],
  },
  "unconventional-art": {
    title: "Unconventional art",
    description: "Art that breaks traditional rules.",
    images: ["#D9A5B5", "#E5A5A5", "#F0A5A5"],
  },
  "surreal-design": {
    title: "Surreal design",
    description: "Dreamlike and surreal compositions.",
    images: ["#E5A5A5", "#F0A5A5", "#C9ADA7"],
  },
  "abstract-concept": {
    title: "Abstract concept",
    description: "Abstract explorations of form and color.",
    images: ["#F0A5A5", "#C9ADA7", "#D4A5A5"],
  },
  "personal-project-1": {
    title: "Personal project 1",
    description: "A personal creative exploration.",
    images: ["#E0BBE4", "#D5B7E4", "#CAB3E4"],
  },
  "personal-project-2": {
    title: "Personal project 2",
    description: "Personal work and experimentation.",
    images: ["#D5B7E4", "#CAB3E4", "#BF9FE4"],
  },
  "personal-project-3": {
    title: "Personal project 3",
    description: "Creative personal pursuits.",
    images: ["#CAB3E4", "#BF9FE4", "#E0BBE4"],
  },
  "personal-project-4": {
    title: "Personal project 4",
    description: "Ongoing personal work.",
    images: ["#BF9FE4", "#E0BBE4", "#D5B7E4"],
  },
  "kvido-cups": {
    title: "KVIDO cups",
    description: "Handcrafted ceramic cups.",
    images: ["#A8D8EA", "#AA96DA", "#FCBAD3"],
  },
  "kvido-bowls": {
    title: "KVIDO bowls",
    description: "Beautiful serving and decorative bowls.",
    images: ["#AA96DA", "#FCBAD3", "#F8B4D4"],
  },
  "kvido-plates": {
    title: "KVIDO plates",
    description: "Unique ceramic plates.",
    images: ["#FCBAD3", "#F8B4D4", "#F0AED8"],
  },
  "kvido-vases": {
    title: "KVIDO vases",
    description: "Sculptural ceramic vases.",
    images: ["#F8B4D4", "#F0AED8", "#A8D8EA"],
  },
  "kvido-collection": {
    title: "KVIDO collection",
    description: "Complete collection of KVIDO pottery.",
    images: ["#F0AED8", "#A8D8EA", "#AA96DA"],
  },
};

export default function ProjectPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string }
  searchParams?: { category?: string }
}) {
  const project = PROJECTS[params.slug];
  const category = searchParams?.category;
  
  let backLink = "/";
  let backText = "← Back to all projects";
  
  if (category) {
    backLink = `/?category=${encodeURIComponent(category)}`;
    backText = `← Back to ${category}`;
  }

  if (!project) {
    return (
      <div>
        <h1>Project not found</h1>
        <Link href={backLink}>{backText}</Link>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7f7fa',
      padding: 'max(16px, 4vw)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 540,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 32px #0002',
        padding: 'clamp(18px, 6vw, 36px)',
        margin: 'max(12px, 2vw) 0',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>
        <Link href={backLink} style={{ fontSize: 15, color: '#888', marginBottom: 6, textDecoration: 'none', fontWeight: 500, letterSpacing: 0.1 }}>
          {backText}
        </Link>
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 2.5rem)',
          margin: 0,
          fontFamily: 'Creatura, sans-serif',
          color: '#181828',
          fontWeight: 700,
          letterSpacing: -1,
        }}>{project.title}</h1>
        <p style={{
          fontSize: 'clamp(1.05rem, 3.5vw, 1.18rem)',
          color: '#444',
          margin: 0,
          lineHeight: 1.7,
          fontWeight: 400,
        }}>{project.description}</p>
        {project.images && project.images.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            margin: '18px 0 0 0',
          }}>
            {project.images.map((imageColor: string, index: number) => (
              <div
                key={index}
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  background: imageColor,
                  borderRadius: 12,
                  boxShadow: '0 2px 12px #0001',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
