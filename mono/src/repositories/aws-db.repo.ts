import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import config from '../config/config'

export class DynamoClient {
  private readonly DynamoConfig = {
    region: 'us-east-2',
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID_AUTH,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY_AUTH

    }
  }

  private readonly DynamoClient: DynamoDBClient
  constructor () {
    this.DynamoClient = new DynamoDBClient(this.DynamoConfig)
  }

  async getUser (params: any): Promise<any> {
    try {
      const paramsuser = {

        KeyConditionExpression: 'mail = :mail',
        ExpressionAttributeValues: {
          ':mail': { S: params.mail }
        },
        TableName: 'usersConvert'
      }
      const command = new QueryCommand(paramsuser)
      const response = await this.DynamoClient.send(command)
      
      return response
    } catch (error) {
      throw error
    }
  }

  async postUser (params: any): Promise<any> {
    
    try {
      const paramuser = {
        Item: {
          mail: {
            S: params.mail
          },
          password: {
            S: params.password
          },
          name: {
            S: params.name
          },
          id:{
            S: params.id
          }
        },
        TableName: 'usersConvert'
      }
      const command = new PutItemCommand(paramuser)
      await this.DynamoClient.send(command)
    } catch (error) {
      throw error
    }
  }
}
