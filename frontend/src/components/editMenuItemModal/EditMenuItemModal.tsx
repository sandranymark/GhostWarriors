import { useEffect } from "react";
import "./EditMenuItemModal.css";
import { Product } from "../../types/productType";

interface ProductEditModalProps {
  product: Product; // Produkten som ska redigeras
  onClose: () => void; // Funktion för att stänga modalen
  onSave: (updatedProduct: Product) => void; // Funktion för att spara ändringar
}

function EditMenuItemModal({ product, onClose, onSave }: ProductEditModalProps) {
  // Hantera stängning av modalen
  function handleClose(): void {
    const modalRef = document.querySelector(".modal-wrapper") as HTMLElement;
    const overlayRef = document.querySelector(".modal-overlay") as HTMLElement;

    if (modalRef) {
      modalRef.classList.add("hide");
    }

    if (overlayRef) {
      overlayRef.style.display = "none";
    }

    // Återställ eventuell filtrering på bakgrund
    const secondSectionRef = document.querySelector(".app > section:nth-child(2)") as HTMLElement;
    if (secondSectionRef) {
      secondSectionRef.style.filter = "none";
    }

    onClose(); // Informera parent-komponenten att modalen är stängd
  }

  function handleSave(): void {
    if (product) {
      const updatedProduct = {
        ...product,
        // Lägg till andra uppdaterade värden från formuläret här
      };
      onSave(updatedProduct); // Skicka det uppdaterade objektet till parent
      handleClose(); // Stäng modalen efter sparning
    }
  }

  if (!product) {
    return null; // Visa ingenting om ingen produkt är vald
  }

  return (
    <div className="modal-overlay">
      <section className="modal-wrapper">
        <h2>Edit Product</h2>
        <form className="modal-form">
          <input
            type="text"
            defaultValue={product.productName}
            aria-label="Product Name"
            placeholder="Product Name"
            className="modal-inputField"
          />
          <input
            type="number"
            defaultValue={product.productPrice}
            aria-label="Product Price"
            placeholder="Product Price"
            className="modal-inputField"
          />
          <textarea
            defaultValue={product.description}
            aria-label="Description"
            placeholder="Description"
            className="modal-textarea"
          ></textarea>
          <button
            type="button"
            className="modal-btn save"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="modal-btn close"
            onClick={handleClose}
          >
            Close
          </button>
        </form>
      </section>
    </div>
  );
}

export default EditMenuItemModal;

// Författare: Anton