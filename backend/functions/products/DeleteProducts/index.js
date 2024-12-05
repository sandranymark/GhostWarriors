import { sendError, sendResponse } from "../../../responses/responses.js";
import db from "../../../services/services.js";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { deleteProductSchema } from "../../../models/productSchema.js";

async function deleteProduct(event) {
  try {
    const { id } = event.pathParameters || {};
    console.log("Path parameters:", event.pathParameters);

    if (!id) {
      return sendError(400, "Missing id in path parameters.");
    }

    const validationResult = deleteProductSchema.validate({ id });
    if (validationResult.error) {
      return sendError(400, validationResult.error.details[0].message); // Returnera första felet
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

export const handler = middy(deleteProduct).use(httpErrorHandler());

// Författare: Anton
// Edit by Sandra - lagt till  middy, httpErrorHandler och lagt in validering med joi.
