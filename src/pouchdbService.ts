import PouchDB from 'pouchdb';
import find from 'pouchdb-find';

PouchDB.plugin(find);

// Initialize PouchDB
const localDB = new PouchDB('green-planet');

const remoteDBOptions = {
    auth: {
        username: 'admin',
        password: 'pwd123'
    },
    skip_setup: true // This option prevents PouchDB from trying to create the database if it doesn't exist
};

const remoteDB = new PouchDB('https://couchdbhn.ddns.net/green-planet', remoteDBOptions);

// Sync the local database with the remote one
localDB.sync(remoteDB, {
    live: true,
    retry: true
}).on('change', function (info) {
    console.log('Sync change:', info);
}).on('paused', function (err) {
    console.log('Sync paused:', err);
}).on('active', function () {
    console.log('Sync resumed');
}).on('denied', function (err) {
    console.log('Sync denied:', err);
}).on('error', function (err) {
    console.error('Sync error:', err);
});

console.log('Intance created & sync...')

export const pouchdbService = {
    // getAllDocuments: async () => {
    //     const response = await localDB.allDocs({ include_docs: true });
    //     return response.rows.map(row => row.doc);
    // },
    getAllDocumentsByType: async (type: string) => {

        const selector = {
            Collection: type
        };

        const options = {
            include_docs: true,
            selector: selector
        };

        const response = await localDB.allDocs(options);

        return response.rows;
    },
    findAllDocumentsByType: async (collection: string, sortField: string, sortType: 'asc' | 'desc') => {
        const selector = {
            Collection: collection,
            [sortField]: {$exists: true}
        };
         
        // const response = await localDB.find({
        //     selector: selector,
        //     sort: [{ [sortField]: 'asc' }]
        // });

        const response = await localDB.createIndex({
            index: {fields: [sortField]}
          }).then(function () {
            return localDB.find({
              selector: selector,
              sort: [{ [sortField]: sortType }]
            });
          });

        // debugger
        return response.docs;
    },
    addDocument: async (document: any) => {
        const response = await localDB.post(document);
        return response;
    },
    updateDocument: async (document: any) => {
        // Ensure the document has _id and _rev properties
        if (!document._id || !document._rev) {
            throw new Error('Document must have _id and _rev properties to be updated');
        }
        const response = await localDB.put(document);
        return response;
    },
    deleteDocument: async (id: string, rev: string) => {
        // Ensure the document has _id and _rev properties
        if (!id || !rev) {
            throw new Error('Document must have _id and _rev properties to be updated');
        }
        const response = await localDB.remove(id, rev);
        return response;
    }
};
