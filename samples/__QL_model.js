
require('./graphql_objs').graphDefault;
require('./graphql_objs').graphDates;

module.exports.tables_ql = new GraphQLObjectType ({
    name: 'tables' ,
    fields: () => ({
        id:           { type: GraphQLString  } ,
        bookedName:   { type: GraphQLString  } ,
        tableParty:   { type: GraphQLString  } ,
        changed:      { type: GraphQLDate    }
    })
});
