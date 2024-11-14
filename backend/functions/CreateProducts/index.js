
import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";

export async function handler(event) {

  try {
      const productData = { 
        quantity : event.quantity,
        imageURL : event.imageURL,
        id : event.id,
        productPrice : event.productPrice,
        category : event.category,
        createdAt : event.createdAt,
        description : event.description,
        ingredients : event.ingredients,
        inStock : event.inStock,
        preparationTime : event.preparationTime,
        productName : event.productName } = JSON.parse(event.body);

    console.log("Parsed body:", productData );

    // Vilka parametrar som skickas in får vi definera upp bättre längre fram. 
    // Det som vi skickar in nu är bara för att se så att det fungerar.

    const params = {
      TableName: "menuTable",
      Item: productData ,
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