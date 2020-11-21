import { observable, configure, action, runInAction, flow, computed, autorun } from 'mobx';
import axios from 'axios';

function buyApple() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const id = Date.now();
            const app = {
                id,
                isEaten: false,
                title: `红苹果-${id}号`,
                weight: ~~(Math.random() * 200 + 150),
            }
            resolve(app);
        }, 1000)
    });
}

// 通过配置强制程序使用action函数更改应用程序中的状态
configure({enforceActions: 'observed'});

class AppleStore {
  @observable apple_list = [];
  @observable loading = false;

  @action.bound addApple (apple) {
    this.apple_list.push(apple);
  }

  @action.bound eatApple (id) {
    for (const apple of this.apple_list) {
        if (apple.id === id) {
            apple.isEaten = true;
            break;
        }
    }
  }

  @action.bound async buyApple () {
    runInAction(() => this.loading = true);
    const app = await buyApple();
    this.addApple(app);
    runInAction(() => this.loading = false);
  }

  @computed get getUnEatenApple () {
    return this.apple_list.filter((apple) => !apple.isEaten)
  }
  @computed get getEatenWeight () {
    return this.apple_list.reduce((a, b) => {
        return b.isEaten ? a + b.weight : a;
    }, 0);
  }
  @computed get getEatenNumber () {
      return this.apple_list.length - this.getUnEatenApple.length
  }
  @computed get getUnEatenWeight () {
    return this.apple_list.reduce((a, b) => {
        return !b.isEaten ? a + b.weight : a;
    }, 0);
  }
  @computed get getUnEatenNumber () {
    return this.getUnEatenApple.length
  }
}

const appleStore = new AppleStore();

export default appleStore;
