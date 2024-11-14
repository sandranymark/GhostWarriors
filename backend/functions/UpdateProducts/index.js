import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";

export async function handler(event) {
  try {
    // Hämta `id` från URL-parameter och de uppdaterade fälten från body
    const { id } = event.pathParameters;
    const updateFields = JSON.parse(event.body);

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

    const params = {
      TableName: "menuTable",
      Key: { id: id },
      UpdateExpression, // Används för att specificera vilka fält som ska uppdateras.
      ExpressionAttributeValues, // Innehåller de nya värdena för varje uppdaterat fält.
      ReturnValues: "ALL_NEW", // gör att DynamoDB returnerar det uppdaterade objektet efter uppdateringen.
    };

    const result = await db.update(params);

    return sendResponse(200, {
      message: `Product with id ${id} updated!`,
      updatedProduct: result.Attributes, // Skickar tillbaka den uppdaterade produktens data
    });
  } catch (error) {
    console.log("Error updating product", error);
    sendError(500, error.message);
  }
}

// Författare: Anton
