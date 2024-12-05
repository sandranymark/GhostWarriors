// VALIDERING AV ID

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



//Förklaring 
// Om det inte finns något objekt med det angivna id:t så returneras ett felmeddelande.
// om id inte är en sträng, kastar funktionen ett fel. (typeof id !== 'string')
// trim () kontrollerar om id är en tom sträng eller bara innehåller mellanslag.
// Om id inte är en sträng eller om den inte är exakt 8 tecken lång returneras ett felmeddelande.
//




//Författare: SANDRA