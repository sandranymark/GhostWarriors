import { sendError, sendResponse } from "../../responses/responses.js";
import db from "../../services/services.js";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";


async function GetAllProducts(event) {
  try {
    const { Items } = await db.scan({ TableName: "menuTable" });
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

export const handler = middy(GetAllProducts)
.use(httpErrorHandler());

// Författare: Adréan
// Modifierad: Anton
// Edit by Sandra - lagt till  middy, httpErrorHandler och skapat ett valideringsSchema med JOI men inte
// lagt in det här ännu ( vet inte om vi ska ha det ).
