// services/paymentService.ts
import { CartItem } from "../../types/cartType";
import { FormData } from "./../../types/formData";
import { createOrder } from "./../orders/orderService";
import { paymentSchema } from "./../../models/paymentSchema";

export const handlePayment = async (
  formData: FormData,
  cart: CartItem[],
  clearCart: () => void,
  resetForm: () => void,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>> // Korrekt typ
): Promise<void> => {
  setErrorMsg(""); // Rensa tidigare felmeddelanden

  // Validera formuläret
  const { error } = paymentSchema.validate(formData, { abortEarly: false });
  if (error) {
    setErrorMsg(error.details[0].message);
    return;
  }

  try {
    if (cart.length > 0) {
      const orderItems = cart.map((item) => ({
        productID: item.id,
        productName: item.heading,
        productPrice: item.price,
        productTotalPrice: item.price * item.quantity,
        productQuantity: item.quantity,
      }));

      const totalPrice = orderItems.reduce((total, item) => total + item.productTotalPrice, 0);

      const newOrder = {
        orderStatus: "pending",
        orderItems,
        totalPrice,
        customerID: "cust12334",
        paymentStatus: "pending",
        customerName: formData.name,
        customerContacts: {
          email: formData.email,
        },
      };

      const response = await createOrder(newOrder);
      console.log("newOrder created:", newOrder);
      console.log("Response created:", response);

      clearCart();
      resetForm();
      const paymentConfirmedRef = document.querySelector(
        ".paymentConfirmed__wrapper"
      ) as HTMLElement;
      if (paymentConfirmedRef) {
        paymentConfirmedRef.classList.remove("hide");
      }
    }
  } catch (error) {
    console.error("Failed to process payment:", error);
    setErrorMsg("Failed to process payment. Please try again.");
  }
};
