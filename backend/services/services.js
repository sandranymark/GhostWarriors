import DynamoDbPkg from "@aws-sdk/client-dynamodb";
import DynamoDbDocumentPkg from "@aws-sdk/lib-dynamodb";

const { DynamoDB } = DynamoDbPkg;
const { DynamoDBDocument } = DynamoDbDocumentPkg;

const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

export default db;

// Författare: Adréan, Anton, Sandra
