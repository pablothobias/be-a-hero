const connection = require('../database/connection');

module.exports = {
    async listIncidentsByOng(request, response) {

        try {

            const ong_id = request.headers.authorization;

            const incidents = await connection('incidents')
                .where('ong_id', ong_id)
                .select('*');

            return response.json({incidents});
        } catch (err) {
            console.log(err);
            return response.status(404).json({ error: 'Not Found' });
        }
    }
};