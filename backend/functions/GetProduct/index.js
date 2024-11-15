import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";

export async function handler(event) {

    try {
        const { id } = event.pathParameters;

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

// Författare: Anton