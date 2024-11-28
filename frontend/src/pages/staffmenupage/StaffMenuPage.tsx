import { useEffect, useState } from "react";
import { Product } from "../../types/productType";
import {
  getProducts,
  updateProduct,
} from "../../services/products/productService";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import StaffMenuItem from "../../components/staffMenuItem/StaffMenuItem";
import EditMenuItemModal from "../../components/editMenuItemModal/EditMenuItemModal";

function StaffMenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Håller reda på den valda produkten
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Visar modalen

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

  // Hantera produktredigering
  const handleEdit = (product: Product) => {
    console.log("Selected product for editing:", product);
    console.log("Modal is visible", modalVisible);
    setSelectedProduct(product); // Spara den valda produkten i state
    setModalVisible(true); // Visa modalen
  };

  const handleSaveChanges = async (updatedProduct: Product) => {
    try {
      if (!updatedProduct.id) throw new Error("Product ID is missing");

      const response = await updateProduct(updatedProduct.id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === response.id ? response : product
        )
      );
      setModalVisible(false); // Stäng modalen
      setSelectedProduct(null); // Nollställ vald produkt
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="menupage-section">
      <Header />
      <menu className="menu">
        {products.length > 0 ? (
          products.map((product) => (
            <StaffMenuItem
              key={product.id}
              product={product}
              onSave={(updatedProduct) => {
                setProducts((prevProducts) =>
                  prevProducts.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                  )
                );
              }}
            //   onEdit={handleEdit} // Skicka redigeringshanteraren som prop
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </menu>
      {modalVisible && selectedProduct && (
        <EditMenuItemModal
          product={selectedProduct}
          onClose={() => setModalVisible(false)} // Stäng modalen vid klick på stäng
          onSave={handleSaveChanges} // Hantera sparandet av ändringar
        />
      )}
      <Footer />
    </section>
  );
}

export default StaffMenuPage;
