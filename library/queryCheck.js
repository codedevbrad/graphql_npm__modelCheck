/**
 * Takes a MongodDB model schema and GraphQL schema and checks that all fields and field types match together.
 * @param {Mongodb_model } MongoDBmodel
 * @param {GraohQLmodel } GraphQLmodel 
 * @returns array of objects containing fails if found or empty if all checks pass.
 */

const graphSchemaTest = ( DbModel , GraphQLmodel ) => {

    // db model..
    let {paths}  = DbModel; // allows us to access the schema fields as an object.

    // map schema field name and its type to a new array.
    let pathArr  = Object.values( paths );
    let db_model = pathArr.map( ( { path , instance } ) => {
        return { path , instance }
    });

    // convert db_model array into single object where property names are first object property 
    // and its value is the second property.
    // done so we can later find the field name using db_model_obj[value]. 
    // allows for faster searching rather than looping.
    let db_model_obj = db_model.reduce( ( result, item) => {
        var key1 = Object.values(item)[0];
        var key2 = Object.values(item)[1];
        result[key1] = key2;
        return result;
    }, {});

    // console.log( db_model  , '----------' );
    // console.log( db_model_obj );

    // graphql model.
    let graphqlProperties = GraphQLmodel["_fields"]();
    
    // map schema field name and its type to a new array.
    let gQL_model = Object.values( graphqlProperties ).map( ( { type , name } ) => {
        return { name , type }
    });

    // capturing model compare fails.
    let fails = [ ];

    gQL_model.forEach( ( testField ) => {
        let { name , type } = testField;
        if ( name !== 'id' && name !== '_id' ) {

            // console.log( `GraphQL model ${ name } of type: ${ type } , DB Model: ${ db_model_obj[name] }` );

            // creates a fail if current graphql field does not any in MongoDB schema.
            if ( db_model_obj[name] === undefined ) {
                fails.push( { 
                    error: `graphQL field ${ name } not found in db schema.` , 
                    matchType: 'property' 
                });
            }
            // current field exists in db and creates fail if the type does not match. 
            else if ( type != db_model_obj[name] ) {
                fails.push( { 
                    error: `property ${ name } in GraphQL model of type: ${ type } does not match DB Model: ${ db_model_obj[name] }`,
                    matchType: 'type'
                });
            }
        }
    });

    // defined names in graphql must be in db_model and be of same type.
    // console.log( 'model:' , db_model_obj );
    // console.log( '-------------------------------' );
    // console.log( 'schema' , gQL_model );
    return fails;
}

module.exports = graphSchemaTest;