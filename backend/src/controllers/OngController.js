const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

     async listAllOngs (request, response) {
        try {
          const ongs = await connection('ongs').select('*');
      
          return response.json({ ongs });
        } catch (err) {
            console.log(err);
            return response.status(400).json({error: err})
        }
      },
      async createOng (request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
      
        const id = crypto.randomBytes(4).toString('HEX');
      
        try {
          await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
          });
        } catch (err) {
            console.log(err);
            return response.status(500).json({error: err})
        }
      
        return response.json({ id });
      }
};