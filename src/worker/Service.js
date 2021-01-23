const dynamodb = require('../db/dynamodb');
const uuid = require('uuid');

module.exports = class {

    static async saveWorker(data){
        const timestamp = new Date().getTime();
        const params = { 
            dni: data.dni,
            nombre: data.nombre,
            apellido: data.apellido,
            direccion: data.direccion,
            email: data.email,
            fecha_creacion: timestamp
        };
        params.id = uuid.v1();
        await dynamodb.saveEntity(params);
        return params;
    }

    static async getWorker(id){
        const result = await dynamodb.getEntity(id);
        return result.Item;
    }

    static async getWorkers(){
        const results = await dynamodb.getAllEntity();
        return results.Items;
    }
}