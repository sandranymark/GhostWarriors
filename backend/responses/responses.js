export function sendResponse(status, data) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; img-src 'self' https://dforbreakfastimg.s3.eu-north-1.amazonaws.com;",
    },
    body: JSON.stringify({ success: true, data }),
  };
}

export function sendError(status, message) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; img-src 'self' https://dforbreakfastimg.s3.eu-north-1.amazonaws.com;",
    },
    body: JSON.stringify({ success: false, error: message }),
  };
}

// Författare Anton
// Modifierad av Sandra - lagt till CSP
