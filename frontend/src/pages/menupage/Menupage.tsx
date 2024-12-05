import "./Menupage.css";
import { useEffect, useState } from "react";
import { Product } from "../../types/productType";
import useCartStore from "../../stores/cartStore";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MenuItem from "../../components/menuItem/MenuItem";
import { getProducts } from "../../services/products/productService.ts";

function Menupage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // asc = ascending, desc = descending. För filtrering

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

  const filterAndSortProducts: () => Product[] = () => {
    let filteredProducts = products;

    // Filtrera på kategori
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory // Jämför produktens kategori med vald kategori
      );
    }

    // Sortera på pris
    if (sortOrder) {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          sortOrder === "asc"
            ? a.productPrice - b.productPrice // Stigande ordning
            : b.productPrice - a.productPrice // Fallande ordning
      );
    }

    return filteredProducts;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="menupage-section">
      <Header />
      <div className="menupage__filter">
        <select
          className="menupage__category--select"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory || ""}
        >
          <option value="">All Categories</option>
          <option value="Beverage">Beverage</option>
          <option value="Dish">Dish</option>
          <option value="SwedishFika">Swedish Fika</option>
        </select>
        <button
          className={`menupage__filter--btn ${sortOrder === "asc" ? "active" : ""}`}
          onClick={() => setSortOrder("asc")}
        >
          Price: Low to High
        </button>
        <button
          className={`menupage__filter--btn ${sortOrder === "desc" ? "active" : ""}`}
          onClick={() => setSortOrder("desc")}
        >
          Price: High to Low
        </button>
      </div>

      <menu className="menu">
        {Array.isArray(products) && products.length > 0 ? (
          filterAndSortProducts().map((product) => {
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
                quantity={cartItem?.quantity || 0}
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
// Modifiering: Anton - Filtrering av produkter på kategori och pris
