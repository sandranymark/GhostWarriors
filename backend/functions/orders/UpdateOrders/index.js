import middy from "@middy/core";
import db from "../../../services/services.js";
// import { checkRole} from "../../../utils/auth.js";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { validateId } from "../../../utils/validation.js";
import { updateOrderSchema } from "../../../models/orderSchema.js";
import { sendError, sendResponse } from "../../../responses/responses.js";

async function updatedOrder(event) {
  try {
    const { id } = event.pathParameters;
    const updateFields = typeof event.body === "object" && event.body ? event.body : {};

    validateId(id);

    // Kontrollera att det finns några fält att uppdatera
    if (!Object.keys(updateFields).length) {
      return sendError(400, "No fields provided for update.");
    }

    const validationResult = updateOrderSchema.validate(updateFields);
    if (validationResult.error) {
      return sendError(
        400,
        validationResult.error.details.map((detail) => detail.message)
      );
    }

    // Skapar en uppdateringssträng och ett objekt med värden för uppdatering
    let UpdateExpression = "SET ";
    const ExpressionAttributeValues = {};

    for (const [key, value] of Object.entries(updateFields)) {
      UpdateExpression += `${key} = :${key}, `;
      ExpressionAttributeValues[`:${key}`] = value;
    }
    UpdateExpression = UpdateExpression.slice(0, -2);

    const updateParams = {
      TableName: process.env.ORDERS_TABLE || "ordersTable",
      Key: { id },
      UpdateExpression,
      ExpressionAttributeValues,
      ConditionExpression: "attribute_exists(id)",
      ReturnValues: "ALL_NEW",
    };

    const result = await db.update(updateParams);

    return sendResponse(200, {
      message: `Order with id ${id} updated!`,
      updatedOrder: result.Attributes,
    });
  } catch (error) {
    console.error("Error updating order", error);
    return sendError(500, "Internal Server Error");
  }
}

export const handler = middy(updatedOrder).use(jsonBodyParser()).use(httpErrorHandler());
// .use(checkRole(['admin', 'user']));

//Författare: SANDRA
