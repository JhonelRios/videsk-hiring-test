const sift = require('sift');
const { NotFound } = require('./test/utils/errors');

// This is a bonus but you need to do the previous tests before

class Server {
    // Create your server with query features with sift
    // We pass the db when the Server is instantiated (constructor)
    constructor(db) {
        this.db = db;
    }

    async find(collectionName, query) {
        const collection = this.db[collectionName];

        const response = JSON.stringify(collection.filter(sift(query)));
        const formattedResponse = JSON.parse(response);

        if (formattedResponse.length === 0) {
            return new NotFound();
        }

        return formattedResponse;
    }

    async findOne(collectionName, documentId) {
        const collection = this.db[collectionName];
        const query = { id: documentId };

        const response = JSON.stringify(collection.filter(sift(query)));
        const formattedResponse = JSON.parse(response);

        if (formattedResponse.length === 0) {
            return new NotFound('No data found with the id equal as "null".');
        }

        return formattedResponse[0];
    }

    async updateOne(collectionName, documentId, dataToUpdate) {
        const collection = this.db[collectionName];
        const query = { id: documentId }

        const response = JSON.stringify(collection.filter(sift(query)));
        const formattedResponse = JSON.parse(response);

        if (formattedResponse.length === 0) {
            return new NotFound('No data for update found with the id equal as "null".');
        }

        const newResponse = {...formattedResponse[0], ...dataToUpdate};

        return newResponse;
    }
}

module.exports = Server;
