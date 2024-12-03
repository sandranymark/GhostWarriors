import './StaffMenuPage.css'
import { useEffect, useState } from "react";
import { Product } from "../../types/productType";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../services/products/productService";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import StaffMenuItem from "../../components/staffMenuItem/StaffMenuItem";
import AddProductForm from "../../components/addProductForm/AddProductForm";

function StaffMenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        setErrorMsg("Failed to fetch products");
      }
    } catch (err) {
      setErrorMsg("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: Omit<Product, "id" | "createdAt">) => {
    try {
      const response = await createProduct(newProduct);
      // console.log("API response", response);
      if (response) { 
        setProducts((prevProducts) => [...prevProducts, response]); 
        // console.log("Full response", response);
        // console.log(handleAddProduct)
        // console.log(newProduct)
        await fetchProducts(); // Hämta produkterna igen vid lyckat tillägg av produkt
        setIsFormVisible(false); // Stäng form vid lyckad inläggning av produkt
      } else {
        setErrorMsg("Failed to add product");
      }

    } catch (error) {
      setErrorMsg("Failed to add product");
      // console.error("Failed to add product", error); 
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
    // console.log("Form visibility toggled to", !isFormVisible);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    const prevProducts = [...products]; // Spara nuvarande state
    // console.log("Payload sent to backend:", updatedProduct);

    if (!updatedProduct.id) {
      // console.log("Product id is missing");
      setErrorMsg("Product id is missing");
      return; // Avsluta funktion om id saknas
    }

    // Ta bort createdAt och id från payloaden som valideras via joi i backenden.
    const { createdAt, id, ...updateField } = updatedProduct;

    try {
      // Uppdatera state lokalt INNAN api-anropet
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      // console.log("Updated product", updateField);
      const response = await updateProduct(updatedProduct.id, updateField);
      console.log("Response from updateProduct:", response);
      
    } catch (error) {
      // console.log("Failed to update product", error);
      setProducts(prevProducts); // Vid fel visa produkt som innan ändring
      setErrorMsg("Could not update product");
    }
  };

  const handleDeleteProduct = async (id: string) => {

    if(!id) {
      setErrorMsg("Id for this product could not be found");
      // console.log("Id for this product could not be found", id);
      return;
    }
    try {
      console.log("Try to delete product with ID:", id)
      await deleteProduct(id);
      setProducts((prevProducts) => 
      prevProducts.filter((product) => product.id !== id));
      // console.log("delete success, new list", products);
    } catch (error) {
      setErrorMsg("Failed to remove product");
      // console.error("Error deleting product", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>; 

  return (
    <section className="menupage-section">
      <Header />
      {isFormVisible && <AddProductForm onAddProduct={handleAddProduct} onClose={toggleFormVisibility} />}
      <menu className="menu">
        {products.length > 0 ? (
          products.map((product) => (
            <StaffMenuItem
              key={product.id}
              product={product}
              onSave={handleUpdateProduct}
              onDelete={() => handleDeleteProduct(product.id!)} // Eftersom att vi kollar om vi har ett id tidigare kan vi alltid förvänta oss ett här.
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </menu>
      <button
        className="addProduct__btn"
        onClick={toggleFormVisibility}
      >+
      </button>
      <Footer />
    </section>
  );
}

export default StaffMenuPage;

// Författare: Anton