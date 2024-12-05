import { sendError, sendResponse } from "../../../responses/responses.js";
import db from "../../../services/services.js";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { validateId } from "../../../utils/validation.js";

async function deleteOrder(event) {
  try {
    const { id } = event.pathParameters || {};
    console.log("Path parameters:", event.pathParameters);

    if (!id) {
      return sendError(400, "No ID provided in path parameters.");
    }

    validateId(id);

    const params = {
      TableName: "ordersTable",
      Key: { id: id },
      ReturnValues: "ALL_OLD",
    };

    const result = await db.delete(params);

    if (!result.Attributes) {
      return sendError(404, `Could not find order with id ${id}.`);
    }

    return sendResponse(200, {
      message: `Order with id ${id} deleted successfully.`,
      deletedOrder: result.Attributes,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return sendError(500, `Internal Server Error: ${error.message}`);
  }
}

export const handler = middy(deleteOrder).use(httpErrorHandler());

//Författare: SANDRA
