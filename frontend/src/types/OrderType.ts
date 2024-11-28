export interface Order {
  id: string;
  orderStatus: string;
  orderItems: OrderItem[];
  totalPrice: number;
  customerID: string;
  paymentStatus: string;
  customerName: string;
  customerContacts: {
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  kitchenMessage?: string;
}

export interface NewOrder {
  orderStatus: string;
  orderItems: OrderItem[];
  totalPrice: number;
  customerID: string;
  paymentStatus: string;
  customerName: string;
  customerContacts: {
    email: string;
  };
  kitchenMessage?: string;
}

export interface OrderItem {
  productID: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
}

// Författare Sandra
