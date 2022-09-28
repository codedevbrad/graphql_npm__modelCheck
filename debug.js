const graphSchemaTest = require('./library/queryCheck');
require('./graphql/types').graphDefault;
require('./graphql/types').graphDates;

// schema object...
const mongoose = require('mongoose');

const Schema_db = new mongoose.Schema ({
     bookedName: { type: Date     , required: true } ,
     tableParty: { type: String   , required: true } ,
     tableTime:  { type: Date     , required: true }
});

const Schema_QL = new GraphQLObjectType ({
    name: 'tables' ,
    fields: () => ({
        id:           { type: GraphQLString  } ,
        bookedGame:   { type: GraphQLString  } ,
        tableParty:   { type: GraphQLDate  } ,
        tableTime:    { type: GraphQLDate    }
    })
});

let test_1 = graphSchemaTest( Schema_db , Schema_QL );

console.log( test_1 );