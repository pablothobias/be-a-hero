const connection = require('../database/connection');

module.exports = {
    async listAllIncidents(request, response) {

        const { page = 1 } = request.query;

        try {

            const [count] = await connection('incidents').count();

            const incidents = await connection('incidents')
                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                .limit(5)
                .offset((page - 1) * 5)
                .select([
                    'incidents.*',
                    'ongs.name',
                    'ongs.whatsapp',
                    'ongs.email',
                    'ongs.city',
                    'ongs.uf'
                ]);

            response.header('X-Total-Count', count['count(*)']);

            return response.json(incidents);
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: err })
        }
    },
    async createIncident(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        try {
            const [id] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            });

            return response.json({ id });
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: err })
        }
    },
    async deleteIncident(request, response) {

        const { id } = request.params;
        const ong_id = request.headers.authorization;

        try {
            const incident = await connection('incidents')
                .where('id', id)
                .select('ong_id')
                .first();

            if (incident.ong_id !== ong_id) {
                throw new Error('Operation not permitted.');
            }

            await connection('incidents').where('id', id).delete();

            return response.status(204).send();
        } catch (err) {
            console.log(err);
            return response.status(401).json({ error: err })
        }
    }
};