import { type } from 'os'
import { DynamoClient } from '../repositories/aws-db.repo'

export class UsersService {
  private static instance: UsersService
  private readonly dynamoClient: DynamoClient

  private constructor () {
    this.dynamoClient = new DynamoClient()
  }

  public static getInstance (): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService()
    }
    return UsersService.instance
  }

  public async getUser (params: any): Promise<any> {
    try {
      const response = await this.dynamoClient.getUser(params)

      return response
    } catch (error) {
      throw error
    }
  }

  public async postUser (params: any): Promise<any> {
    
    try {
      const response = await this.dynamoClient.postUser(params)
    } catch (error) {
      throw error
    }
  }
}
