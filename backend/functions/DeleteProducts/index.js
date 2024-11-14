import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";

export async function handler(event) {
  try {
    // Förvänta oss att id skickas med som en query parameter
    const { id } = event.pathParameters;

    if (!id) {
      return sendError(400, "Id is required to delete a product.");
    }

    const params = {
      TableName: "menuTable",
      Key: {
        id: id, // Partition key
      },
    };

    // Anropar delete-metoden
    await db.delete(params);

    return sendResponse(200, `Product with id ${id} deleted successfully.`);
  } catch (error) {
    console.error("Delete error:", error);
    return sendError(500, error.message);
  }
}

// Författare: Anton
