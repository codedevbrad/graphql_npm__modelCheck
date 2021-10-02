
const Schema_db = require('./samples/__db_model').tables_db;
const Schema_QL = require('./samples/__Ql_model').tables_ql;

const graphSchemaTest = require('./test_library/queryCheck');

// test that analytics_incoming correctly defines data from Incoming_Order and Incoming_Table.
let test_1 = graphSchemaTest( Schema_db , Schema_QL );

console.log( test_1 );
