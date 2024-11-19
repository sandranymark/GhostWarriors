

export interface Product {
    id?: string; // id läggs till av backend vid skapande, så detta är valfritt.
    productName: string; // requierd, får inte vara tomt
    productPrice: number; // måste vara >= 0
    category: string; // requierd, får inte varatomt
    imageURL?: string; // valfri, URI.
    description?: string; // valfri
    ingredients?: Record<string, string>; // valfri, kan vara ett objekt med nyckel-värde-par
    inStock?: boolean; // valfri
    preparationTime?: string; // valfri
  }

  // ? Kan liknas med optional, man får välja om man ska skriva in eller inte.

  export type NewProduct = Omit<Product, 'id'>;
  //När du skapar en produkt behöver inte id inkluderas. 
  //För att hantera detta kan du använda Omit-utilitytypen i TypeScript:

  
// Omit är en utility-typ i TypeScript som används för att skapa en ny typ genom att utelämna en 
// eller flera egenskaper från en befintlig typ. 
// Detta är användbart när du vill skapa en typ som liknar en annan typ men utan vissa specifika egenskaper.

// Enkel Förklaring:
// Omit låter dig ta en befintlig typ och ta bort vissa egenskaper från den.

//Författare Sandra
