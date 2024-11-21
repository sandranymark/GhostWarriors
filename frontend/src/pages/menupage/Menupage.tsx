import { useEffect, useState } from "react";
import "./Menupage.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MenuItem from "../../components/menuItem/MenuItem";
import { getProducts } from "../../services/products/productService.ts";
import { Product } from "../../types/productType";
import useCartStore from "../../stores/cartStore"; // Importera useCartStore

function Menupage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cart = useCartStore((state) => state.cart); // Hämta cart från zustand

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.success) {
          setProducts(response.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="menupage-section">
      <Header />
      <menu className="menu">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => {
            // Hämta kvantiteten från varukorgen för produkten
            const cartItem = cart.find((item) => item.id === product.id);
            return (
              <MenuItem
                key={product.id}
                id={product.id || "default-id"}
                image={product.imageURL || "default-image.svg"}
                heading={product.productName}
                price={product.productPrice}
                description={product.description || "No description available"}
                quantity={cartItem?.quantity || 0} // Visa kvantitet (eller 0 om produkten inte finns i cart)
              />
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </menu>
      <Footer />
    </section>
  );
}

export default Menupage;

// Författare Adrèan
// Modifierad av: Sandra (Fetchar produkter från API och visar dem på sidan).
