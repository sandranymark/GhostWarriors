import "./AddProductForm.css";
import { useState } from "react";
import { Product } from "../../types/productType";

function AddProductForm({
  onAddProduct,
  onClose,
}: {
  onAddProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  onClose: () => void;
}) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImageURL, setProductImageURL] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Kontrollera att alla fält är ifyllda korrekt
    if (!productName || productPrice < 0 || !description || !productCategory || !productImageURL) {
      setErrorMsg("Please fill all fields");
      return;
    }

    // Kalla på onAddProduct med produktdata
    onAddProduct({
      productName,
      productPrice,
      description,
      category: productCategory,
      imageURL: productImageURL,
    });

    // Återställ formuläret
    setProductName("");
    setProductPrice(0);
    setDescription("");
    setProductCategory("");
    setProductImageURL("");
    setErrorMsg(null);
  };

  return (
    <section className="addProduct__form--wrapper">
      <button className="login__close-btn login__close-btn--add" onClick={onClose}>
        X
      </button>
      <form className="addProduct__form" onSubmit={handleSubmit}>
        <input
          className="addProduct__input name"
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          className="addProduct__input price"
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          min={0}
        />
        <input
          className="addProduct__input desc"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="addProduct__input category"
          type="text"
          placeholder="Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        <input
          className="addProduct__input Image"
          type="text"
          placeholder="Image URL"
          value={productImageURL}
          onChange={(e) => setProductImageURL(e.target.value)}
        />
        <button className="addProduct__form-btn" type="submit">
          Add Product
        </button>
      </form>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </section>
  );
}

export default AddProductForm;

// Författare Anton
