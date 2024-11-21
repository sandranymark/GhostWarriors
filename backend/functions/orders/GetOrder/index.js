import { sendError, sendResponse } from "../../../responses/responses.js";
import db from "../../../services/services.js";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { validateId } from "../../../utils/validateId.js";


//Förklaring till grapparna: 
// Om det inte finns något objekt med det angivna id:t så returneras ett felmeddelande.
// om id inte är en sträng, kastar funktionen ett fel. (typeof id !== 'string')
// trim () kontrollerar om id är en tom sträng eller bara innehåller mellanslag.
// Om id inte är en sträng eller om den inte är exakt 8 tecken lång returneras ett felmeddelande.
//



async function GetOrder(event) {

    try {
        const { id } = event.pathParameters || {};
        console.log("Path parameters:", event.pathParameters);

       validateId(id);


        const params = {
            TableName: 'ordersTable',
            Key: { id: id },
        };

        const result = await db.get(params);

        if (!result.Item) {
            return sendError(404, `Could not find product with id ${id}...`);
        }

        return sendResponse(200, result.Item);

    } catch (error) {
        console.log('Error fetching product', error);
        return sendError(404, error.message)
    }
};

export const handler = middy(GetOrder)
    .use(httpErrorHandler());

    //Författare: SANDRA