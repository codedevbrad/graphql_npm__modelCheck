const graphSchemaTest = require('../library/queryCheck');
require('../graphql/types').graphDefault;
require('../graphql/types').graphDates;

// schema object...
const mongoose = require('mongoose');

const Schema_db_1 = new mongoose.Schema ({
     bookedName:  { type: String   , required: true } ,
     tableParty2: { type: String   , required: true } ,
     tableTime2:  { type: Date     , required: true }
});

const Schema_QL_1 = new GraphQLObjectType ({
    name: 'tables' ,
    fields: () => ({
        id:           { type: GraphQLString  } ,
        bookedName:   { type: GraphQLString  } ,
        tableParty:   { type: GraphQLString  } ,
        tableTime:    { type: GraphQLDate    }
    })
});


let test_1 = graphSchemaTest( Schema_db_1 , Schema_QL_1 );


test('will return 2 errors', ( ) => {
  expect( test_1.length).toBeGreaterThan(0);
});