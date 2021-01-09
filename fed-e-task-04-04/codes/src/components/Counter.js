import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Counter = () => {
    const dispatch = useDispatch();
    const counterReducer = useSelector(state => state.counterReducer);
    return (
        <div>
            {counterReducer.count}
            <button onClick={() => dispatch({type: 'increment'})}>+1</button>
            <button onClick={() => dispatch({type: 'increment_async'})}>+1 async</button>
        </div>
    );
}

export default Counter;
