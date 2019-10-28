import uuid from 'uuid';

import * as dynamoDbLib from './libs/dynamodb-lib'
import { success, failure } from './libs/response-lib'

export function main(event) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      articleId: uuid.v1(),
      url: data.url,
      name: data.name,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call("put", params)

    return success(params.Item)
  } catch (e) {
    return failure({ status: false})
  }
}
