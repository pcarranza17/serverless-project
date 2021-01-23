'use strict';
const service = require('./Service');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const validator = require('@middy/validator');

const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        dni: { type: 'string', minLength: 8, maxLength: 8 },
        nombre: { type: 'string' },
        apellido: { type: 'string' },
        direccion: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['dni','nombre','apellido'] 
    }
  }
}

const saveWorker = async (event) => {
  var response = {
    statusCode: 200
  }

  try{
    console.log('Inicia petición');
    const data = event.body;
    const result = await service.saveWorker(data);
    response.body = JSON.stringify({
        "data" : result
    });
  }catch(err){
    console.error('Error', err);
    response.statusCode = 500;
    response.body = JSON.stringify({'message': 'ocurrió un error mientras se intentaba generar el registro del trabajador'});
  }

  return response;
};

module.exports.saveWorker = middy(saveWorker)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: schema }))
  .use(httpErrorHandler());

module.exports.getWorker = async (event) => {

  var response = {
    statusCode: 200
  }

  try{
    const id = event.pathParameters.id;
    const result = await service.getWorker(id);
    response.body = JSON.stringify(result);
  }catch(err){
    console.error('Error', err);
    response.statusCode = 500;
    response.body = JSON.stringify({'message': 'ocurrió un error mientras se intentaba obtener al trabajador'});
  }

  return response;
  
};

module.exports.getWorkers = async (event) => {

  var response = {
    statusCode: 200
  }

  try{
    const result = await service.getWorkers();
    response.body = JSON.stringify(result);
  }catch(err){
    console.error('Error', err);
    response.statusCode = 500;
    response.body = JSON.stringify({'message': 'ocurrió un error mientras se intentaba obtener la lista de trabajadores'});
  }

  return response;
  
};
