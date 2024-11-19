import axios from 'axios';
import { Product, NewProduct } from '../../types/productType.ts';

interface ProductsResponse {
  success: boolean;
  data: Product[];
}

const API_URL = 'https://i0hwwn0u7f.execute-api.eu-north-1.amazonaws.com/products';


// GET: Hämta alla produkter

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>(API_URL);
  return response.data;
};


// GET: Hämta en produkt med ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

// POST: Skapa en ny produkt
export const createProduct = async (product: NewProduct): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, product, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

// PUT: Uppdatera en produkt
export const updateProduct = async (id: string, updatedProduct: Partial<Product>): Promise<Product> => {
  const response = await axios.put<Product>(`${API_URL}/${id}`, updatedProduct, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

// DELETE: Ta bort en produkt
export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};


// Förklaring av typerna 
// Product: Skulle man kunna säga representerar den fullständiga
// Productmodellen som vi har skapat (inklusive id)

// NewProduct: Utesluter id för nya produkter som ska skickas till APIet när det skapas

// Partial<Product> i updateProduct: Gör alla fält i Product valfria, eftersom en uppdatering inte kräver att alla fält måste vara med.
// Detta gör det möjligt att skicka enbart de fält som ska uppdateras.