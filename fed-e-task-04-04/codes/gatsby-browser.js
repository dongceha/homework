const React = require('react');
// const Layout = require('./src/components/Layout').default;

// export.wrapPageElement = ({element}) => {
//     return <Layout>{element}</Layout>
// }
const {Provider} = require('react-redux');
const createStore = require('./src/store/createStore').default;

exports.wrapRootElement = ({element}) => {
    return <Provider store={createStore()}>{element}</Provider>
}
