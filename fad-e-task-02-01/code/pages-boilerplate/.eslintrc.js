module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "rules": {
    // 缩进
    "indent": [
      "error",
      2
    ],
    // 引号
    "quotes": [
      1,
      "single"
    ],
    // 分号结尾
    "semi": [
      "error",
      "always"
    ],
    // 最大空行100
    "no-multiple-empty-lines": [0, {
      "max": 100
    }],
    "no-mixed-spaces-and-tabs": [0],
    //不能使用console
    "no-console": 'off',
    //未定义变量不能使用
    "no-undef": 0,
    //一行结束后面不要有空格
    "no-trailing-spaces": 1,
  }
};
