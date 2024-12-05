import "./StaffMenuPage.css";
import { useEffect, useState } from "react";
import { Product } from "../../types/productType";
import useAuthStore from "../../stores/authStore";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import StaffMenuItem from "../../components/staffMenuItem/StaffMenuItem";
import AddProductForm from "../../components/addProductForm/AddProductForm";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../services/products/productService";

function StaffMenuPage() {
  const { isLoading, setLoading } = useAuthStore();

  const [products, setProducts] = useState<Product[]>([]);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: Omit<Product, "id" | "createdAt">) => {
    try {
      const response = await createProduct(newProduct);
      if (response) {
        setProducts((prevProducts) => [...prevProducts, response]);
        await fetchProducts(); // Hämta produkterna igen vid lyckat tillägg av produkt
        setIsFormVisible(false); // Stäng form vid lyckad inläggning av produkt
      } else {
        setErrorMsg("Failed to add product");
      }
    } catch (error) {
      setErrorMsg("Failed to add product");
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    const prevProducts = [...products]; // Spara nuvarande state

    if (!updatedProduct.id) {
      setErrorMsg("Product id is missing");
      return;
    }

    // Ta bort createdAt och id från payloaden som valideras via joi i backenden.
    const { createdAt, id, ...updateField } = updatedProduct;

    try {
      // Uppdatera state lokalt INNAN api-anropet
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
      );

      const response = await updateProduct(updatedProduct.id, updateField);
      console.log("Response from updateProduct:", response);
    } catch (error) {
      setProducts(prevProducts); // Vid fel visa produkt som innan ändring
      setErrorMsg("Could not update product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!id) {
      setErrorMsg("Id for this product could not be found");
      return;
    }
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      setErrorMsg("Failed to remove product");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <section className="menupage-section">
      <Header />
      {isFormVisible && (
        <AddProductForm onAddProduct={handleAddProduct} onClose={toggleFormVisibility} />
      )}
      <menu className="menu">
        {products.length > 0 ? (
          products.map((product, index) => (
            <StaffMenuItem
              key={product.id?.toString() || `temp-key-${index}`}
              product={product}
              onSave={handleUpdateProduct}
              onDelete={() => handleDeleteProduct(product.id!)}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </menu>
      <button className="addProduct__btn" onClick={toggleFormVisibility}>
        +
      </button>
      <Footer />
    </section>
  );
}

export default StaffMenuPage;

// Författare: Anton
