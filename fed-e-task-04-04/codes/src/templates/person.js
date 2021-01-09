import React from 'react';

const person = ({pageContext}) => {
    const {name, age} = pageContext;
    return (
        <div>
            {name}
            {age}
        </div>
    );
}

export default person;
