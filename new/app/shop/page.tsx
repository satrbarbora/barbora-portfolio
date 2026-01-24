import ProductGrid from '../../components/ProductGrid';

export default function Shop() {
  return (
    <div style={{ maxWidth: 1200, margin: '60px auto' }}>
      <h1 style={{ fontSize: 28, marginBottom: 32 }}>Shop</h1>
      <ProductGrid />
    </div>
  );
}
