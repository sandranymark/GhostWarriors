import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { sendError, sendResponse } from "../../../responses/responses.js";
import db from "../../../services/services.js";
import { v4 as uuid } from "uuid";
import { productSchema } from "../../../models/productSchema.js";

async function createProduct(event) {
  console.log("Incoming event body:", event.body);

  const productID = uuid().substring(0, 8);

  try {
    const {
      imageURL,
      productPrice,
      category,
      description,
      ingredients,
      inStock,
      preparationTime,
      productName,
    } = event.body;

    const createdAt = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" });

    const productData = {
      imageURL,
      productPrice,
      category,
      description,
      ingredients,
      inStock,
      preparationTime,
      productName,
    };

    const validationResult = productSchema.validate(productData);

    if (validationResult.error) {
      return sendError(400, validationResult.error.details.map((detail) => detail.message));
    }
    // lägger till productID och CreatedAT i productData EFTER validering
    productData.id = productID;
    productData.createdAt = createdAt;

    const params = {
      TableName: "menuTable",
      Item: productData,
    };

    await db.put(params);
    console.log("Product successfully added to database.");

    return sendResponse(201, "Product added successfully.");
  } catch (error) {
    console.error("Error:", error.stack);
    return sendError(500, `Failed to create product: ${error.message}`);
  }
}


export const handler = middy(createProduct)
  .use(jsonBodyParser())
  .use(httpErrorHandler());

// Författare: Anton
// Edit by Sandra - lagt till jsonBodyParser, middy, httpErrorHandler och lagt in validering med joi.