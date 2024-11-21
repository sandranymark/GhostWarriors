export function validateId(id) {
    if (!id) {
        throw new Error("Missing 'id' parameter.");
    }
    if (typeof id !== 'string') {
        throw new Error("'id' parameter must be a string.");
    }
    if (id.trim() === '') {
        throw new Error("'id' parameter cannot be an empty string.");
    }
    if (id.length !== 8) {
        throw new Error("'id' parameter must be exactly 8 characters long.");
    }
}

//Författare: SANDRA