import db from "../../services/db.js";

export const handler = async (event) => {
  try {
    // Gör en scan, dvs tar hem HELA tabellen bonzaiRooms. INTE optimalt på en stor databas.
    const { Items } = await db.scan({
      TableName: "productsTable",
    });
    // OM du får träff returneras alla beställningar. Annars fel.
    if (Items.length > 0) {
      return 200, Items;
    } else {
      throw new Error(404, "Rooms not found! Do a POST /rooms to create them.");
    }
  } catch (error) {
    throw new Error(404, error.message);
  }
};
