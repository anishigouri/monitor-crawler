var { Client } = require('pg');

function createDBConnection() {

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'caddev',
        password: 'postgres',
        port: 5432,
    })
    
    return client;
}

module.exports = function() {
    return createDBConnection;
}
