import React, {  } from "react";
import { inject, observer } from "mobx-react";
import './index.less';
import logo from './apple.png';

export default (props) => {
    const {apple, eatApple} = props;
    return (
        <div className="appleItem">
            <div className="apple"><img src={logo} alt=""/></div>
            <div className="info">
                <div className="name">{ apple.title }</div>
                <div className="weight">{ apple.weight }克</div>
            </div>
            <div className="btn-div">
                <button onClick={()=> eatApple(apple.id)}> 吃掉 </button>
            </div>
        </div>
    );
}
