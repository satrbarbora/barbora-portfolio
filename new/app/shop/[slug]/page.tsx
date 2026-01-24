import { products } from '../../../data/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToRequestButton from '../../../components/AddToRequestButton';

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();
  return (
    <div style={{ maxWidth: 800, margin: '60px auto', fontSize: 20 }}>
      <h1>{product.title}</h1>
      <p style={{ marginBottom: 16 }}>{product.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 24 }}>
        {product.images.map((img, i) => (
          <Image
            key={img}
            src={img}
            alt={product.title + ' image ' + (i + 1)}
            width={300}
            height={220}
            style={{ borderRadius: 8, objectFit: 'cover', maxWidth: '100%' }}
          />
        ))}
      </div>
      <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 16 }}>€{product.price}</div>
      {product.sold ? (
        <div style={{ color: '#888', fontWeight: 600, fontSize: 18 }}>SOLD</div>
      ) : (
        <AddToRequestButton product={product} />
      )}
    </div>
  );
}
