
import { useEffect, useState } from "react";
import "./Menupage.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MenuItem from "../../components/menuItem/MenuItem";
import { getProducts } from "../../services/products/productService.ts"; 
import { Product } from "../../types/productType"; 


function Menupage() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Fetches products from API
        console.log("Fetched products:", response); // Logs the response object

        if (response.success) {
          // Set products to response.data since that's where the products are
          setProducts(response.data); 
        } else {
          setError("Failed to fetch products"); // Handle error if success is false
        }
        setIsLoading(false); // Stop the loading state
      } catch (err) {
        console.error(err); 
        setError("Failed to fetch products"); // Handle error if fetching fails
        setIsLoading(false); // Stop the loading state
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
          products.map((product) => (
            <MenuItem
              key={product.id}
              image={product.imageURL || "default-image.svg"}
              heading={product.productName}
              price={product.productPrice}
              description={product.description || "No description available"} 
            />
          ))
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
