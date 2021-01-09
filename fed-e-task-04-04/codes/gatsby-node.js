const path = require('path');

// 创建页面
// function createPages ({actions}) {
//     const {createPage} = actions;
//     // 获取模板的绝对路径
//     const template = require.resolve('./src/templates/person.js');
//     // 获取模板所需要的数据
//     const persons = [
//         {name: '张三', age: 12, slug: 'zhangsan'},
//         {name: '李四', age: 13, slug: 'lisi'},
//     ]
//     // 根据模板和数据创建页面
//     persons.forEach(person => {
//         createPage({
//             // 模板的绝对路径
//             component: template,
//             // 访问地址
//             path: `/person/${person.slug}`,
//             // 传递给模板的数据
//             context: person,
//         })
//     })
// }
async function createPages ({graphql, actions}) {
    const template = require.resolve('./src/templates/article.js');
    const { createPage } = actions;
    // 获取页面的访问标识
    const {data} = await graphql(`
        query {
            allMarkdownRemark {
            nodes {
                fields {
                slug
                }
            }
        }
      }
    `);

    // 创建页面
    data.allMarkdownRemark.nodes.forEach(node => {
        createPage({
            component: template,
            path: `/article/${node.fields.slug}`,
            context: {
                slug: node.fields.slug
            }
        })
    })
}
// 将 markdown 数据放入数据层
function onCreateNode({node, actions}) {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md');
        createNodeField({
            node,
            name: 'slug',
            value: slug,
        })
    }
}

module.exports = {
    createPages,
    onCreateNode
}
