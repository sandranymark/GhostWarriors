import axios from "axios";
import { Order, NewOrder } from "../../types/OrderType.ts";

interface OrderResponse {
  success: boolean;
  data: {
    message: string;
    order: Order; // Här pekar vi på hela orderobjektet
  }; // Hanterar en lista av ordrar
}

interface SingleOrderResponse {
  success: boolean;
  data: Order; // Hanterar en enskild order
}

const API_URL = "https://i0hwwn0u7f.execute-api.eu-north-1.amazonaws.com/orders";

// GET: Hämta alla order
export const getAllOrders = async (): Promise<OrderResponse> => {
  const response = await axios.get<OrderResponse>(API_URL);
  return response.data;
};

// GET: Hämta en order med ID
export const getOrderById = async (id: string): Promise<Order> => {
  const response = await axios.get<Order>(`${API_URL}/${id}`);
  return response.data;
};

// POST: Skapa en ny order
export const createOrder = async (order: NewOrder): Promise<Order> => {
  const response = await axios.post<{
    success: boolean;
    data: {
      message: string;
      order: { id: string }; // Här ligger ID för den skapade ordern
    };
  }>(API_URL, order, {
    headers: { "Content-Type": "application/json" },
  });

  // Skapa en Order baserat på responsen och den inkommande `order`
  const createdOrder: Order = {
    ...order, // Kopiera all information från den nya ordern
    id: response.data.data.order.id, // Lägg till det returnerade orderID
    createdAt: new Date().toISOString(), // Mocka en skapad tid
    updatedAt: new Date().toISOString(), // Mocka en uppdaterad tid
  };
  return createdOrder;
};

// PUT: Uppdatera en order
export const updateOrder = async (id: string, updatedOrder: Partial<Order>): Promise<Order> => {
  const response = await axios.put<SingleOrderResponse>(`${API_URL}/${id}`, updatedOrder, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Response from API: ", response.data);

  return response.data.data;
};

// DELETE: Ta bort en order
export const deleteOrder = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// GET: Hämta statusen på en order
export const getOrderStatusById = async (id: string): Promise<Order> => {
  const response = await axios.get<SingleOrderResponse>(`${API_URL}/${id}`);
  console.log("GETORDERSTATUS", response.data.data);
  return response.data.data; // Returnera den enskilda ordern
};
