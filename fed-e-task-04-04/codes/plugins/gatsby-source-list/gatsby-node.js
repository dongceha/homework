const axios = require('axios');
const { paginate } = require('gatsby-awesome-pagination');

exports.sourceNodes = async ({}, {apiURL}) => {
    const articles = await loadArticles(apiURL);
    console.log('articles=====', articles)
}

async function loadArticles(apiURL) {
    let limit = 100;
    let offset = 0;
    let result = [];
    await load();
    async function load () {
        let { data } = await axios.get(`${apiURL}/articles`, {
            params: {
                limit,
                offset,
            }
        });
        result.push(...data.articles);
        if (result.length < data.articlesCount) {
            offset += limit;
            await load();
        }
    }
    return result;
}

// exports.createPages = async ({actions, graphql}) => {
//     const {createPage} = actions;
//     let {data} = await graphql(`
//       query {
//           allArticlesList {
//               node {
//                   slug
//               }
//           }
//       }
//     `);

//     paginate({
//         createPage, // The Gatsby `createPage` function
//         items: data.allArticlesList.node, // An array of objects
//         itemsPerPage: 10, // How many items you want per page
//         pathPrefix: '/list', // Creates pages like `/blog`, `/blog/2`, etc
//         component: path.resolve('...'), // Just like `createPage()`
//     })
// }