const connection = require('../database/connection');

module.exports = {
    async create (request, response) {

        const { id } = request.body;

        try {

            const ong = await connection('ongs')
                .where('id', id)
                .select('name')
                .first();

            if (!ong) {
                throw new Error();
            }

            return response.json({ ong });
        } catch (err) {
            console.log(err);
            return response.status(401).json({error: 'Not Authorized'})
        }
    }
};