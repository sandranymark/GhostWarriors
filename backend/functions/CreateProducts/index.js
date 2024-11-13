
import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";

export async function handler(event) {

  try {
      const { 
        quantity,
        id,
        price,
        category,
        productsType,
        createdAt,
        descriptiont,
        ingredients,
        inStock,
        preparationTime,
        productName } = JSON.parse(event.body);

    console.log("Parsed body:", { quantity,
        category,
        productsType,
        createdAt,
        descriptiont,
        ingredients,
        id,
        inStock,
        preparationTime,
        productName });

    // Vilka parametrar som skickas in får vi definera upp bättre längre fram. 
    // Det som vi skickar in nu är bara för att se så att det fungerar.

    const params = {
      TableName: "productsTable",
      Item: {
            id,
            price,
            quantity,
            category,
            productsType,
            createdAt,
            descriptiont,
            ingredients,
            inStock,
            preparationTime,
            productName
      },
    };

    await db.put(params);
    console.log("Put successful");
    return sendResponse(201, 'Product added successfully.');
  } catch (error) {
    console.error("Error:", error);
    return sendError(500, error.message);
  }
}

// Författare: Anton