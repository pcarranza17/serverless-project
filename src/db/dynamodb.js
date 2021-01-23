var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB.DocumentClient();

class DynamoDB {
    static async saveEntity(event){
        try {
            console.log('DB input : ',event);
            const params = {
                TableName: process.env.DYNAMODB_TABLE,
                Item: event
            };
            return await dynamodb.put(params).promise();
        } catch (error) {
            console.log('error', error);
            throw new Error(error.message);
        }
    }

    static async getEntity(id){
        try {
            const params = {
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                  id: id
                }
            };

            return await dynamodb.get(params).promise();
            
        } catch (error) {
            console.log('error', error);
            throw new Error(error.message);
        }
    }

    static async getAllEntity(){
        try {
            const params = {
                TableName: process.env.DYNAMODB_TABLE,
            };
            
            return await dynamodb.scan(params).promise();
            
        } catch (error) {
            console.log('error', error);
            throw new Error(error.message);
        }
    }

}

module.exports = DynamoDB;