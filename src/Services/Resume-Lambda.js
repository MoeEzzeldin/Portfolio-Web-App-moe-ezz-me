// import pkg from '@aws-sdk/client-dynamodb';
// const { DynamoDBClient, GetItemCommand } = pkg; 
// import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

// const dynamoDb = new DynamoDBClient({ region: 'us-east-1' });

// export const handler = async (event) => {
//     const params = {
//         TableName: 'Resume',  // Make sure this is the correct table name
//         Key: marshall({
//             'pk': 'resume',  // Partition key
//             'sk': 'info'     // Sort key
//         })
//     };

//     try {
//         const data = await dynamoDb.send(new GetItemCommand(params));

//         if (data.Item) {
//             const item = unmarshall(data.Item);
//             return {
//                 statusCode: 200,
//                 headers: {
//                     "Access-Control-Allow-Origin": "*",  // CORS header
//                     "Access-Control-Allow-Headers": "Content-Type",
//                     "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
//                 },
//                 body: JSON.stringify(item),
//             };
//         } else {
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ message: 'Item not found' }),
//             };
//         }
//     } catch (error) {
//         return {
//             statusCode: 500,
//             headers: {
//                 "Access-Control-Allow-Origin": "*",  // CORS header
//             },
//             body: JSON.stringify({ message: 'Error retrieving resume data', error: error.message }),
//         };
//     }
// };
