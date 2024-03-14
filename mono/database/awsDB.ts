import  {DynamoDBClient,CreateTableCommand, AttributeDefinition, KeySchemaElement, DescribeTableCommand} from '@aws-sdk/client-dynamodb'
import config from '../src/config/config'
export default async function setUpEnviroment() {

  const DynamoConfig: any = {
    region: 'us-east-2',
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID_AUTH,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY_AUTH

    }}
  const DynamoClient = new DynamoDBClient(DynamoConfig)
  
        try {
          const describeTableParams = { TableName: 'usersConvert' };
          try {
            await DynamoClient.send(new DescribeTableCommand(describeTableParams));
            console.log('La tabla ya existe. No es necesario crearla.');
            return;
          } catch (error: any) {
            if (error.name !== 'ResourceNotFoundException') {
              throw error;
            }
          }
          const params = {
            TableName: 'usersConvert',
            KeySchema: [
              { AttributeName: 'mail', KeyType: 'HASH' },
              { AttributeName: 'id', KeyType: 'RANGE' }
            ] as KeySchemaElement[],
            AttributeDefinitions: [
              { AttributeName: 'id', AttributeType: 'S' },
              { AttributeName: 'mail', AttributeType: 'S' }
          
            ] as AttributeDefinition[],
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1,
            },
          };
          
    
          const command = new CreateTableCommand(params);
          const result = await DynamoClient.send(command);
          
          return result;
        } catch (error) {
          throw error;
        }
      }
