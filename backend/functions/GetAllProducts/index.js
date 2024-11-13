import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";

export async function handler(event) {
  try {
    const { Items } = await db.scan({ TableName: "productsTable" });
    console.log("Items:", Items);
    if (Items && Items.length > 0) {
      return sendResponse(200, Items)
    } else {
      return sendError(404, 'No product items found, please add product items to database')
    }
  } catch (error) {
    console.error("Scan error:", error);
    return sendError(404, error.message)
  }
}

// Författare: Adréan
// Modifierad: Anton