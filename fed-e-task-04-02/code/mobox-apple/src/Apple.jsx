import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import AppleItem from './components/AppleItem';
import './index.less'
@inject("apple")
@observer
class Apple extends Component {
  componentDidMount() {
    // const { getData } = this.props.counter;
    // getData();
  }
  render() {
    const { apple } = this.props;
    console.log(apple);
    const {
        apple_list,
        getUnEatenApple,
        eatApple,
        buyApple,
        getEatenWeight,
        getEatenNumber,
        getUnEatenWeight,
        getUnEatenNumber,
        loading
    } = apple;
    return (
      <div className="appleBusket">
            <div className="title">苹果篮子</div>
            <div className="stats">
                <div className="section">
                    <div className="head">当前</div>
                    <div className="content">{getUnEatenNumber}个苹果，{getUnEatenWeight}克</div>
                </div>
                <div className="section">
                    <div className="head">已吃掉</div>
                    <div className="content">{getEatenNumber}个苹果，{getEatenWeight}克</div>
                </div>
            </div>

            <div className="appleList">
            {
                getUnEatenApple.map((apple) => {
                    return <AppleItem key={apple.id} apple={apple} eatApple={eatApple}/>
                })
            }
            </div>

            <div className="btn-div">
                <button disabled={loading} className={loading ? 'disabled' : ''} onClick={buyApple}>购买苹果</button>
            </div>
        </div>
    );
  }
}

export default Apple;
