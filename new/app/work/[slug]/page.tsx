import { projects } from '../../../data/projects';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return (
    <div style={{ maxWidth: 800, margin: '60px auto', fontSize: 20 }}>
      <h1>{project.title}</h1>
      <p style={{ marginBottom: 32 }}>{project.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {project.images.map((img, i) => (
          <Image
            key={img}
            src={img}
            alt={project.title + ' image ' + (i + 1)}
            width={400}
            height={300}
            style={{ borderRadius: 8, objectFit: 'cover', maxWidth: '100%' }}
          />
        ))}
      </div>
    </div>
  );
}
