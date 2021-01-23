const util = require('./Util');


module.exports = class {

    static async getPerson(id){

        const response =await  util.getSwapi(`${process.env.SWAPI_RESOURCE_PEOPLE}/${id}`);
        
        if(!response.success){
            return response;
        }else{
            let data = response.data;
            let person = {
                'nombre' : data.name,
                'altura' : data.height,
                'masa' : data.mass,
                'color_cabello': data.hair_color,
                'color_de_piel' : data.skin_color,
                'color_ojos': data.eye_color,
                'anio_nacimiento': data.birth_year,
                'genero' : data.gender,
                'planeta' : data.homeworld,
                'peliculas': data.films,
                'especies' : data.species,
                'vehiculos' : data.vehicles,
                'naves_estelares': data.starships,
                'fecha_creacion': data.created,
                'fecha_eidicon': data.edited,
                "url": data.url
            };

            return {
                success: response.success,
                data: person
            }
        }
        
    }
}