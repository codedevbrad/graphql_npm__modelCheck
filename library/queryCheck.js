
const graphSchemaTest = ( DbModel , GraphQLmodel ) => {

    // db model
    let {paths}  = DbModel;
    let pathArr  = Object.values( paths );
    let db_model = pathArr.map( ( { path , instance } ) => {
        return { path , instance }
    });

    let db_model_obj = db_model.reduce( ( result, item) => {
        var key1 = Object.values(item)[0];
        var key2 = Object.values(item)[1];
        result[key1] = key2;
        return result;
    }, {});

    // graphql model.
    let graphqlProperties = GraphQLmodel["_fields"]();
    let gQL_model = Object.values( graphqlProperties ).map( ( { type , name } ) => {
        return { name , type }
    });

    // capturing model compare fails.
    let fails = [ ];

    gQL_model.forEach( ( testField ) => {
        let { name , type } = testField;
        if ( name !== 'id' && name !== '_id' ) {

            // console.log( `GraphQL model ${ name } of type: ${ type } , DB Model: ${ db_model_obj[name] }` );
            if ( db_model_obj[name] === undefined ) {
                fails.push( { 
                    error: `graphQL field ${ name } not found in db schema.` , 
                    matchType: 'property' 
                });
            } 
            else if ( type != db_model_obj[name] ) {
                fails.push( { 
                    error: `property ${ name } in GraphQL model of type: ${ type } does not match DB Model: ${ db_model_obj[name] }`,
                    matchType: 'type'
                });
            }
        }
    });

    // defined names in graphql must be in db_model and be of same type.
    console.log( 'model:' , db_model_obj );
    console.log( '-------------------------------' );
    console.log( 'schema' , gQL_model );
    return fails;
}

module.exports = graphSchemaTest;