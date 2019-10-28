import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event) {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      articleId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);

    if (!result.Item) {
      return failure({ status: false, error: 'Item not found.' });
    }

    return success(result.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
