import { useEffect, useState } from "react";
import { Product } from "../../types/productType";
import { getProducts, updateProduct } from "../../services/products/productService";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import StaffMenuItem from "../../components/staffMenuItem/StaffMenuItem";

function StaffMenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleUpdateProduct = async (updatedProduct: Product) => {
    const prevProducts = [...products]; // Spara nuvarande state
    console.log("Payload sent to backend:", updatedProduct);

    if (!updatedProduct.id) {
      console.log("Product id is missing");
      setError("Product id is missing");
      return; // Avsluta funktion om id saknas
    }

    // Ta bort createdAt och id från payloaden som valideras via joi i backenden.
    const { createdAt, id, ...updateField } = updatedProduct;

    try {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      console.log("Updated product", updateField);
      const response = await updateProduct(updatedProduct.id, updateField);
      console.log("Response from updateProduct:", response);
      
    } catch (error) {
      console.log("Failed to update product", error);
      setProducts(prevProducts);
      setError("Could not update product");
    }
  };

  if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

  return (
    <section className="menupage-section">
      <Header />
      <menu className="menu">
        {products.length > 0 ? (
          products.map((product) => (
            <StaffMenuItem
              key={product.id}
              product={product}
              onSave={handleUpdateProduct}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </menu>
      {error && <p>{error}</p>}
      <Footer />
    </section>
  );
}

export default StaffMenuPage;
