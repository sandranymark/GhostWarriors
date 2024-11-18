import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { getProductByIdSchema } from "../../validations/validations.js";

 async function GetProduct(event) {

    try {
        const { id } = event.pathParameters || {};
        console.log("Path parameters:", event.pathParameters);
    
        if (!id) {
          return sendError(400, "Missing id in path parameters.");
        }
    
        const validationResult = getProductByIdSchema.validate({ id });
        if (validationResult.error) {
          return sendError(400, validationResult.error.details[0].message); // Returnera första felet
        }

        const params = {
            TableName: 'menuTable',
            Key: { id: id },
        };

        const result = await db.get(params);

        if(!result.Item) {
            return sendError(404, `Could not find product with id ${id}...`);
        }

        return sendResponse(200, result.Item);

    } catch (error) {
        console.log('Error fetching product', error);
        return sendError(404, error.message)
    }
};

export const handler = middy(GetProduct)
    .use(httpErrorHandler());

// Författare: Anton
// Edit by Sandra - lagt till middy, httpErrorHandler och lagt in validering med joi.