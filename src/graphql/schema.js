import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

window.data = peopleData;

const updatePerson = (id, name) => {
  const person = peopleData.find(person => person.id === parseInt(id, 10));

  if (person) {
    person.name = name;
    return person;
  }

  return null;
};

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (_, { id }) => peopleData.find(person => person.id === parseInt(id, 10))
    },
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updatePerson: {
      type: PersonType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve: (_, { id, name }) => updatePerson(id, name)
    }
  }
})

export const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });
