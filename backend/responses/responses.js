export function sendResponse(status, data) {
    return {
        statusCode: status,
        headers: {
            "Content-Type": "application/json",
            // "Content-Security-Policy": "default-src 'self'; frame-ancestors 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self';", // CSP-standard
          },
        body: JSON.stringify({ success: true, data }),
    };
}

export function sendError(status, message) {
    return {
        statusCode: status,
        headers: {
            "Content-Type": "application/json",
            // "Content-Security-Policy": "default-src 'self'; frame-ancestors 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self';", // CSP-standard

        },
        body: JSON.stringify({ success: false, error: message }),
    };
}


// Författare Anton

//Testa denna:
//Content-Security-Policy: default-src 'self'; frame-ancestors 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self' http://localhost:5173 https://zbehfdy0l4.execute-api.eu-north-1.amazonaws.com; base-uri 'self'; form-action 'self';
//