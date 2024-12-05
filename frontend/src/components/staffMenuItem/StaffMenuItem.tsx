import "./StaffMenuItem.css";
import { useState } from "react";
import { Product } from "../../types/productType";

interface StaffMenuItemProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onDelete: () => void;
}

function StaffMenuItem({ product, onSave, onDelete }: StaffMenuItemProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: name === "productPrice" ? parseFloat(value) : value, // Konvertera pris till ett nummer
    }));
  };

  const saveChanges = () => {
    onSave(updatedProduct);
    setEditMode(false);
  };

  const confirmDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <article className="staff__menuItem--article">
      <figure className="menuItem__figure">
        <img
          className="menuItem__image"
          src={updatedProduct.imageURL}
          alt={updatedProduct.productName}
        />
      </figure>

      {editMode ? (
        <div className="edit__menuItem">
          <textarea
            className="input__name input"
            name="productName"
            value={updatedProduct.productName}
            onChange={handleInputChange}
          />
          <div className="input__price--wrapper">
            <input
              className="input__price input"
              name="productPrice"
              type="number"
              min={1}
              value={updatedProduct.productPrice}
              onChange={handleInputChange}
            />
            <span className="currency-label">SEK</span>
          </div>
          <textarea
            className="input__desc input"
            name="description"
            value={updatedProduct.description || ""}
            onChange={handleInputChange}
          />
          <div className="edit__menuItem--btn-wrapper">
            <button className="edit__menuItem--btn" onClick={saveChanges}>
              Save
            </button>
            <button className="edit__menuItem--btn" onClick={() => setEditMode(false)}>
              Cancel
            </button>
            <button className="edit__menuItem--btn" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="staffMenuItem__edit--content">
          <h2 className="staffMenuItem__heading">{product.productName}</h2>
          <p className="staffMenuItem__price">{product.productPrice} SEK</p>
          <p className="staffMenuItem__description--edit">{product.description}</p>
          <button className="edit__btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      )}
    </article>
  );
}

export default StaffMenuItem;

// Författare: Anton
