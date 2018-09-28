const graphql = require('graphql');
const _ = require('lodash');
/**desctructuring the graphql library */
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} =graphql;

const issues=[
    {id:"1", owner:"reg", description:"Its all sorts of broken", workaround:"shoot it", next_Steps:"bury it", ticket_Link: "https://reggordon.com"}
]

/**defining the graphql object */
const IssueType = new GraphQLObjectType({
name: 'Issue',
fields:{
    id: {type:GraphQLString},
    owner: { type:GraphQLString},
    description: { type:GraphQLString},
    workaround: { type:GraphQLString},
    next_Steps: { type:GraphQLString},
    ticket_Link: {type:GraphQLString}
}
});

/**root query is the jumping point for the app. */

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        issue:{
            type:IssueType,
            args:{id:{type:GraphQLString}},
            /** resolve is where we enter data store to find data.ParentValue is never called
             * args calls whatever is passed to the original query
             */
            resolve(parentValue, args){
                return _.find(issues, {id:args.id})

            }
        }
    }
})

module.exports= new GraphQLSchema({
    query:RootQuery
})