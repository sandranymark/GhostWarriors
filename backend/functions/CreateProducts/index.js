import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";
import { v4 as uuid } from "uuid";

export async function handler(event) {
  // Generera unikt id
  const productID = uuid().substring(0, 8);

  try {
    // Parsa inkommande body
    const {
      quantity,
      imageURL,
      productPrice,
      category,
      description,
      ingredients,
      inStock,
      preparationTime,
      productName,
    } = JSON.parse(event.body);

    const createdAt = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" });
    //Tillagt av Sandra som ska vara  så jobbig hela tiden :D

    const productData = {
      quantity,
      imageURL,
      id: productID,
      productPrice,
      category,
      createdAt,
      description,
      ingredients,
      inStock,
      preparationTime,
      productName,
    };

    console.log("Parsed body:", productData);

    // Vilka parametrar som skickas in får vi definera upp bättre längre fram.
    // Det som vi skickar in nu är bara för att se så att det fungerar.

    const params = {
      TableName: "menuTable",
      Item: productData,
    };

    await db.put(params);
    console.log("Put successful");
    return sendResponse(201, "Product added successfully.");
  } catch (error) {
    console.error("Error:", error);
    return sendError(500, error.message);
  }
}

// Författare: Anton
