const axios = require('axios');
const pluralize = require('pluralize');
const createNodeHelpers = require("gatsby-node-helpers").default

async function sourceNodes({actions}, configOptions) {
    const {createNode} = actions;
    const {apiURL, contentTypes} = configOptions;
    const types = contentTypes.map(type => type.toLowerCase()).map(type => pluralize(type));

    let final = await getContents(types, apiURL);
    for (let [key, value] of Object.entries(final)) {
        // 创建数据节点
        const {createNodeFactory} = createNodeHelpers({
            typePrefix: key,
        });
        const createNodeObject = createNodeFactory('content');
        // 2. 根据数据节点对象创建节点
        value.forEach(item => {
            const obj = createNodeObject(item);
            createNode(obj)
        });
    }
}

// 初始调用
async function getContents (types, apiURL) {
    const size = types.length;
    let index = 0;
    const final = {};
    await loadContents()
    async function loadContents() {
        if (index === size) return;
        const {data} = await axios.get(`${apiURL}/${types[index]}`);
        final[types[index ++]] = data;
        await loadContents()
    }
    return final;
}

module.exports = {
    sourceNodes
}