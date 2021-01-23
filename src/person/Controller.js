'use strict';
const service = require('./Service');

module.exports.handler = async (event) => {

  var response = {
    statusCode: 200
  }

  try{
    const id = event.pathParameters.id;
    const result = await service.getPerson(id);
    
    response.body = JSON.stringify(result);
  }catch(err){
    console.error(err.error.status);
    console.error(err.message);
    response.statusCode = err.status;
    response.body = JSON.stringify({'message': err.message});
  }

  return response;
};

