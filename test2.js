const { NotFound, ServerError } = require('./test/utils/errors');

module.exports = async function Test2 (server, queries) {
    try {    
        const response = await server.query(queries); // Will return an array with the results, empty array or error
        
        const formattedResponse = JSON.parse(response);

        if (formattedResponse.length === 0) {
            return new NotFound();
        }
    
        return formattedResponse;
    } catch (e) {
        return new ServerError('Error in database.');
    }
}
