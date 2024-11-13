
import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";

export async function handler(event) {

  try {
    const { id, productsType, amount, price } = JSON.parse(event.body);

    console.log("Parsed body:", { id, productsType, amount, price });

    // Vilka parametrar som skickas in får vi definera upp bättre längre fram. 
    // Det som vi skickar in nu är bara för att se så att det fungerar.

    const params = {
      TableName: "productsTable",
      Item: {
        id,
        productsType: productsType,
        price,
        amount,
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