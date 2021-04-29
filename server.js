const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

const petList = [
    { id: 1, name: 'Fluffy', species: 'Dog' },
    { id: 2, name: 'Sassy', species: 'Cat' },
    { id: 3, name: 'Goldberg', species: 'Frog' }
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
    addPet: ({ name, species }) => {
        const pet = { name, species };
        petList.push(pet);

        return pet
    },
    updatePet: ({ id, name, species }) => {
        const pet = petList[id];
        if (pet === undefined) {
            return null
        }

        pet.name = name || pet.name;
        pet.species = species || pet.species;

        return pet;
    },
    deletePet: ({ id }) => {
        const pet = petList[id];

        if (pet === undefined) {
            return null;
        }

        petList.splice(id, 1);

        return pet;
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

