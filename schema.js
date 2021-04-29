const { buildSchema } = require('graphql');

const enums = `
    enum Species {
        Dog
        Cat
        Frog
    }
`

const types = `
    type Pet {
        id: Int!
        name: String!
        species: Species!
    }

    type Time {
        hour: String!
        minute: String!
        second: String!
    }

    type Dice {
        total: Int!
        sides: Int!
        rolls: [Int]
    }
`
const queries = `
    type Query {
        allPets: [Pet!]
        getPet(index: Int!): Pet
        firstPet: Pet
        getTime: Time
        getRandom(range: Int!): Int
        getRoll(sides: Int!, rolls: Int!): Dice
        getCount: Int!
        petsInRange(start: Int!, count: Int!): [Pet!]!
        getPetBySpecies(species: String!): [Pet!]!
    }
`

const mutations = `
    addPet(name: String!, species: String!): Pet!
    updatePet(id: Int!, name: String, species: String): Pet
`

const schema = `
    ${enums}
    ${types}
    ${queries}
    ${mutations}
`

module.exports = buildSchema(schema);