export interface Product {
  id?: string;
  category: string;
  imageURL?: string;
  inStock?: boolean;
  createdAt?: string;
  productName: string;
  productPrice: number; // måste vara >= 0
  description?: string;
  preparationTime?: string;
  ingredients?: Record<string, string>;
}

// ? Kan liknas med optional, man får välja om man ska skriva in eller inte.

export type NewProduct = Omit<Product, "id">;
//När du skapar en produkt behöver inte id inkluderas.
//För att hantera detta kan du använda Omit-utilitytypen i TypeScript:

// Omit är en utility-typ i TypeScript som används för att skapa en ny typ genom att utelämna en
// eller flera egenskaper från en befintlig typ.
// Detta är användbart när du vill skapa en typ som liknar en annan typ men utan vissa specifika egenskaper.

// Enkel Förklaring:
// Omit låter dig ta en befintlig typ och ta bort vissa egenskaper från den.

//Författare Sandra
