import db from "../../services/services.js";

export async function handler(event) {
  try {
    const { Items } = await db.scan({ TableName: "productsTable" });
    console.log("Items:", Items);
    if (Items && Items.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(Items),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Products not found! Do a POST /products to create them.",
        }),
      };
    }
  } catch (error) {
    console.error("Scan error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while scanning the products table.",
        errorDetails: error.message,
      }),
    };
  }
}
