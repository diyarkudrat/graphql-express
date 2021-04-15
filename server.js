const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    enum Species {
        Dog
        Cat
        Frog
    }

    type Pet {
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
`)

const petList = [
    { name: 'Fluffy', species: 'Dog' },
    { name: 'Sassy', species: 'Cat' },
    { name: 'Goldberg', species: 'Frog' }
];

// Define a resolver
const root = {
    allPets: () => {
        return petList;
    },
    getPet: ({ index }) => {
        return petList[index];
    },
    firstPet: () => {
        return petList[0];
    },
    getTime: () => {
        return {
            hour: new Date().getHours().toString() - 12,
            minute: new Date().getMinutes().toString(),
            second: new Date().getSeconds().toString(),
        };
    },
    getRandom: ({ range }) => {
        return Math.floor(Math.random() * range);
    },
    getRoll: ({ sides, rolls }) => {
        let totalCount = 0;
        let diceRoll = [];
        for (let i=0; i < rolls; i++) {
            num = Math.floor(Math.random() * sides);
            diceRoll.push(num);
            totalCount += num;
        }

        return {
            total: totalCount,
            rolls: diceRoll,
            sides,
        }
    },
    getCount: () => {
        return petList.length
    },
    petsInRange: ({ start, count }) => {
        let totalPets = [];
        for (let i=0; i <= count; i++) {
            totalPets.push(petList[i])
        }

        return totalPets
    },
    getPetBySpecies: ({ species }) => {
        return petList.filter(item => item.species === species)
    }
}

const app = express();

// Routes
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

const port = 4000;
app.listen(port, () => {
    console.log(`Running on port: ${port}`)
})

