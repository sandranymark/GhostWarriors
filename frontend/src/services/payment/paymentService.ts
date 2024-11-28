// services/paymentService.ts
import { CartItem } from "../../types/cartType";
import { FormData } from "./../../types/formData";
import { createOrder } from "./../orders/orderService";
import { NewOrder, Order } from "../../types/orderType";
import { paymentSchema } from "./../../models/paymentSchema";

export const handlePayment = async (
  formData: FormData,
  cart: CartItem[],
  clearCart: () => void,
  handlePaymentSuccess: () => void,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  setOrder: (order: Order) => void
): Promise<void> => {
  setErrorMsg("");

  // Validera formuläret
  // När abortEarly är inställt på false, instruerar det biblioteket att fortsätta kontrollera alla fält
  // i data även om den hittar ett valideringsfel tidigt.
  // Om det är true (vilket är standardvärdet i Joi), stoppar valideringen så snart det första felet hittas.
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

      const newOrder: NewOrder = {
        orderStatus: "pending",
        orderItems,
        totalPrice,
        customerID: "cust12334",
        paymentStatus: "pending",
        customerName: formData.name,
        customerContacts: { email: formData.email },
      };
      // Anropa backend för att skapa ordern
      const createdOrder = await createOrder(newOrder);

      // Spara ordern i Context eller State
      if (createdOrder) {
        setOrder(createdOrder); // Säkerställ att setOrder anropas korrekt
        clearCart(); // Rensa kundvagnen
        handlePaymentSuccess(); // Visa PaymentConfirmed
      } else {
        setErrorMsg("Cart is empty. Unable to process payment.");
      }
    }
  } catch (error) {
    console.error("Failed to process payment:", error);
    setErrorMsg("Failed to process payment. Please try again.");
  }
};

// Författare Adréan
