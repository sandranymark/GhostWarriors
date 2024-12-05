import { sendError, sendResponse } from "../../../responses/responses.js";
import db from "../../../services/services.js";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { updateProductSchema } from "../../../models/productSchema.js";
import { checkRole } from "../../../middleware/checkRole.js";

async function updatedProduct(event) {
  try {
    const { id } = event.pathParameters;
    const updateFields = event.body; // Vi använder jsonBodyParser (middy) istället för JSON.parse

    const productParams = { TableName: "menuTable", Key: { id: id } };
    const product = await db.get(productParams);
    if (!product.Item) {
      return sendError(404, `Product with id ${id} not found.`);
    }

    const validationResult = updateProductSchema.validate(updateFields);
    if (validationResult.error) {
      return sendError(
        400,
        validationResult.error.details.map((detail) => detail.message)
      );
    }

    // Kontrollera att det finns några fält att uppdatera
    // Om inga fält skickas in i event.body returneras ett felmeddelande
    // för att undvika att uppdateringsoperationen körs utan ändringar.
    if (!Object.keys(updateFields).length) {
      return sendError(400, "No fields provided for update.");
    }

    // Bygg dynamiskt `UpdateExpression` och `ExpressionAttributeValues`
    let UpdateExpression = "SET ";
    const ExpressionAttributeValues = {};

    // Iterera över de fält som skickats in för att bygga upp update-syntaxen
    for (const [key, value] of Object.entries(updateFields)) {
      UpdateExpression += `${key} = :${key}, `;
      ExpressionAttributeValues[`:${key}`] = value;
    }

    // Ta bort sista kommatecknet och mellanslag från UpdateExpression
    // Tydligen viktigt för att få en korrekt formatsträng för DynamoDB
    UpdateExpression = UpdateExpression.slice(0, -2);

    const updateParams = {
      TableName: "menuTable",
      Key: { id: id },
      UpdateExpression, // Används för att specificera vilka fält som ska uppdateras.
      ExpressionAttributeValues, // Innehåller de nya värdena för varje uppdaterat fält.
      ConditionExpression: "attribute_exists(id)", // Kontrollerar att objektet med angivet id existerar.
      ReturnValues: "ALL_NEW", // gör att DynamoDB returnerar det uppdaterade objektet efter uppdateringen.
    };

    const result = await db.update(updateParams);

    return sendResponse(200, {
      message: `Product with id ${id} updated!`,
      updatedProduct: result.Attributes, // Skickar tillbaka den uppdaterade produktens data
    });
  } catch (error) {
    console.log("Error updating product", error);
    throw new Error(error.message);
  }
}

export const handler = middy(updatedProduct)
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .use(checkRole(["admin"])); // Lägger till rollkontroll som middleware för att endast tillåta admin

// Författare: Anton
// Edit by Sandra - lagt till jsonBodyParser, middy, httpErrorHandler och lagt in validering med joi samt roll.
