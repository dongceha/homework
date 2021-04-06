## Redis 课程作业
> 众所周知，微信有几亿的用户群，某一时刻可能有几千人同时在玩漂流瓶，对于这种高并发数据量小的服务，使用 Node.js 和 Redis 绝对是一个不二的选择。

> 第一步，当然是需要设计好与服务器交互的接口，我们采用 JSON 形式的 API 接口，因为 Node.js 中对 HTTP 一流的支持，以及对 JSON 的友好让我们创建 JSON API 变得格外简单。

### 打捞一个漂流瓶
> 我们设定：以 GET 加参数的形式访问服务器打捞一个漂流瓶，返回 JSON 数据：
```js
GET /?user=xxx[&type=xxx]// 成功返回{    "code": 1,  "msg": {    "time": "xxx",    "owner": "xxx",    "type": "xxx",    "content": "xxx"  }}// 失败返回{    "code": 0,  "msg": "xxx"}
GET请求的参数如下。
```

> user：捡漂流瓶的人的用户名或用户id，必须唯一。

> type：漂流瓶类型，这里我们设置三种类型：all代表全部，male代表男性，female代表女性，默认时为all。


> 返回的JSON参数含义如下。
> 1. code：标识码，1代表成功，0代表出错。
> 2. msg：返回的信息，错误时返回错误的信息，成功时返回漂流瓶的信息：
> 3. time：漂流瓶扔出的时间戳。
> 4. owner：漂流瓶主人，可以是用户名或用户id，但必须仅有一个。
> 5. type：漂流瓶类型，为male或female之一。
> 6. content：漂流瓶内容。


### 扔出一个漂流瓶
> 以 POST 形式请求服务器扔出一个漂流瓶，返回 JSON 数据：
```js
POST owner=xxx&type=xxx&content=xxx[&time=xxx]// 成功{    "code": 1,  "msg": "xxx"}// 失败{    "code": "xxx",  "msg": "xxx"}
```
> POST 请求的参数如下。
> 1. time：漂流瓶扔出的时间戳，默认时设置为Date.now（）。
> 2. owner：漂流瓶主人，可以是用户名或用户id，但必须仅有一个。
> 3. type：漂流瓶类型，为male或female之一。
> 4. content：漂流瓶内容。

> 返回的 JSON 参数含义如下。

> 1. code：标识码，0代表错误，1代表正确。
> 2. msg：返回正确或错误时的信息。

> 至此，API 已经设计好了，接下来我们根据设计的 API 来编写代码。

[项目代码地址](https://github.com/dongceha/homework/blob/master/fed-e-task-05-02/code/index.js)  