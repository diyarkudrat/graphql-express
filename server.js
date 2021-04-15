const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type About {
        message: String!
    }

    enum MealTime {
        breakfast
        lunch
        dinner
    }

    type Query {
        getAbout: About
        getMeal(time: String!): Meal
    }

    type Meal {
        description: String!
    }
`)

// Define a resolver
const root = {
    getAbout: () => {
        return { message: 'Hello World' }
    },
    getMeal: ({ time }) => {
        const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' };
        const meal = allMeals[time];

        return { description: meal }
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

