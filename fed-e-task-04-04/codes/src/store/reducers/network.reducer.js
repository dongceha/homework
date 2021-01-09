const initialState = {
    networks: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'addNetWork':
            return {
                networks: [...state.networks, {...action.payload, key: Date.now()}]
            }
        case 'deleteNetWork': {
            const index = action.payload;
            state.networks.splice(index, 1)
            return {
                networks: [...state.networks]
            }
        }
        case 'renameNetWork': {
            const {index, network, name} = action.payload;
            console.log('rename', index)
            state.networks[index] = {network, name};
            return {
                networks: [...state.networks]
            }
        }
        default:
            return state;
    }
}
