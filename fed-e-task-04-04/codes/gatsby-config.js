/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'hello gatsby',
    author: 'Jim',
  },
  /* Your site config here */
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'json',
        path: `${__dirname}/json/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/src/posts`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-images'] // 处理markdown中的图片
      }
    },
    // 'gatsby-transformer-remark',
    'gatsby-transformer-json',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    // {
    //   resolve: 'gatsby-source-strapi',
    //   options: {
    //     apiURL: 'http://localhost:1337',
    //     contentTypes: ['Post', 'Contact']
    //   }
    // },
    // {
    //   resolve: 'gatsby-source-mystrapi',
    //   options: {
    //     apiURL: 'http://localhost:1337',
    //     contentTypes: ['Post', 'Contact']
    //   }
    // },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-less',
    'gatsby-disable-404',
    {
      // 配置客户端路由
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/app/*']
      }
    },
    {
      // 配置客户端路由
      resolve: 'gatsby-source-list',
      options: {
        apiURL: 'https://conduit.productionready.io/api'
      }
    },
  ],
}
