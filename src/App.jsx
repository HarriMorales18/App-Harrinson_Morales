import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!res.ok) {
          throw new Error("Error al obtener productos: " + res.status);
        }
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Productos</h1>
      </header>

      <main>
        <section className="products-grid">
          {products.map((p) => {
            const img = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;
            return (
              <article key={p.id} className="product-card">
                <div className="product-image">
                  {img ? (
                    <img src={img} alt={p.title} loading="lazy" />
                  ) : (
                    <div style={{color: '#666'}}>No image</div>
                  )}
                </div>
                <div className="card-body">
                  <div className="product-price">${p.price}</div>
                  <h2 className="product-title">{p.title}</h2>
                  <p className="product-description">{p.description}</p>
                  <div className="product-category">{p.category?.name}</div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}