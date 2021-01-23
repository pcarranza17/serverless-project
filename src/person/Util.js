
const axios = require('axios');

module.exports = class {

    static async getSwapi(url){

        try {
            const response = await axios.get(url);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.log(error.response.data);
            return {
                success: false,
                data: error.response.data
            }
        }      
    }
}