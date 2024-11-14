import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";

export async function handler(event) {
  try {
    // Förvänta oss att id skickas med som en query parameter
    const { id, productsType } = event.pathParameters;

    if (!id || !productsType) {
      return sendError(400, "Id AND productsType is required to delete a product.");
    }

    const params = {
      TableName: "productsTable",
      Key: {
        id: id, // Partition key
        productsType: productsType, // Sort key
      },
    };

    // Anropar delete-metoden
    await db.delete(params);

    return sendResponse(200, `Product with id ${id} and productsType ${productsType} deleted successfully.`);
  } catch (error) {
    console.error("Delete error:", error);
    return sendError(500, error.message);
  }
}

// Författare: Anton
