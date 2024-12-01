import { Product } from "../../types/productType";
import { useState } from "react";
import './StaffMenuItem.css';

interface StaffMenuItemProps {
    product: Product;
    onSave: (updatedProduct: Product) => void;
    // onEdit: (product: Product) => void; // Ny prop för att hantera redigering
  }

  function StaffMenuItem({ product, onSave }: StaffMenuItemProps) {
    const [editMode, setEditMode] = useState<boolean>(false); // Hanterar redigeringsläge
    const [updatedProduct, setUpdatedProduct] = useState<Product>(product); // Lokalt state för uppdaterad produkt
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("product to be edited:", product);
      const { name, value } = e.target;
      setUpdatedProduct((prev) => ({
        ...prev,
        [name]: name === "productPrice" ? parseFloat(value) : value, // Konvertera pris till ett nummer
      }));
    };
  
    const saveChanges = () => {
      console.log("SaveChanges:", saveChanges)
      onSave(updatedProduct); // Anropa `onSave` med den uppdaterade produkten
      setEditMode(false); // Avsluta redigeringsläge
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
            <input
              className="input__name input"
              name="productName"
              value={updatedProduct.productName}
              onChange={handleInputChange}
            />
            <input
              className="input__price input"
              name="productPrice"
              type="number"
              value={updatedProduct.productPrice}
              onChange={handleInputChange}
            />
            <input
              className="input__desc input"
              name="description"
              value={updatedProduct.description || ""}
              onChange={handleInputChange}
            />
            <div className="edit__menuItem--btn-wrapper">
              <button className="edit__menuItem--btn" onClick={saveChanges}>Save</button>
              <button className="edit__menuItem--btn" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="menuItem__edit--content">
              {/* <div className="menuItem__details"> */}
              <h2 className="menuItem__heading">{product.productName}</h2>
              <p className="menuItem__price">{product.productPrice} SEK</p>
              <p className="menuItem__description--edit">{product.description}</p>
              {/* </div> */}
              <button className="edit__btn" onClick={() => setEditMode(true)}>Edit</button>
          </div>
        )}
      </article>
    );
  }

  export default StaffMenuItem;

  // Författare: Anton
  