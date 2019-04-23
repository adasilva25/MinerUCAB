// https://node-postgres.com/features/connecting
// https://www.npmjs.com/package/dotenv
// https://node-postgres.com/features/queries
// https://stackoverflow.com/questions/21759852/easier-way-to-update-data-with-node-postgres  -->  sending the query in an array
// https://mherman.org/blog/postgresql-and-nodejs/ --> localhost connectionString

require('dotenv').config({ path: '../../.env.development' });
const { Pool, Client } = require('pg');

// const connectionString = 'postgressql://andreadasilva@localhost:5432/testdb' --> ROOKIE CONNECTION

export const DAOPostgreSQLConnection = () => {
    return new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
}

// client.connect();   // conecta a la bd

//              SELECT

// Queries with NO parameters
// Promises
// client.query('SELECT * FROM test_table;')
//     .then((response) => {
//         console.log('Completed!', response.rows[0].id)
//         client.end();
//     })
//     .catch((error) => {
//         console.log(error);
//         client.end();
//     })

// Callback function
// client.query('SELECT * FROM test_table', (err, res) => {
//     console.log(res)
//     client.end()
// })




//              INSERT

// Queries with parameters
// const text = 'INSERT INTO test_table (id, name) VALUES($1, $2);';
// const values = ['5', 'Munich'];

// client.query(text, values)
//   .then((res) => {
//     console.log(res);
//     client.end();
//   })
//   .catch((e) => {
//      console.error(e.stack);
//      client.end();
//    })


//              UPDATE

// const text = 'UPDATE test_table SET name = ($1) WHERE id = ($2);';
// const values = ['LA', '2'];

// client.query(text, values)
//   .then(res => {
//     console.log(res)
//     client.end();
//   })
//   .catch((e) => {
//      console.error(e.stack)
//      client.end();
//    })


//              DELETE

// const text = 'DELETE from test_table WHERE id = ($1);';
// const values = ['9'];

// client.query(text, values)
//   .then(res => {
//     console.log(res)
//     client.end();
//   })
//   .catch((e) => {
//      console.error(e.stack)
//      client.end();
//    })