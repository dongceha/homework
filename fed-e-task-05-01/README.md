## 简答题
1. 简述 Node.js 的特点以及适用的场景。
> 1. node.js 是一个 js 的运行时，能够依赖 V8 引擎执行 js 代码
> 2. node.js 是事件驱动的，非阻塞 io
> 3. 主进程是单线程的，适合io密集的场景，而不是计算密集的场景

2. 简述 Buffer 的使用.包括多种创建方式。实例方法，静态方法。
> 1. Buffer 是数据缓存区，用于处理二进制数据
> 2. 可以配合流操作，进行数据的读、写
```js
let buf1 = Buffer.alloc(3)
buf1.fill(123)
buf1.toString();
let buf2 = Buffer.from(456);
let buf3 = Buffer.concat(buf1, buf3);
```

3. 写出5个以上文件操作的API，并且用文字说明其功能。
> 1. ```fs.stat``` 读取当前文件的属性，是否是文件夹
> 2. ```fs.readdir()``` 读取当前目录下的文件
> 3. ```fs.readFile``` 读取当前文件
> 4. ```fs.writeFile``` 写入文件
> 5. ```fs.createReadStream``` 创建文件读取流
> 6. ```fs.createWriteStream``` 创建文件写入流

4. 简述使用流操作的优势，以及Node中流的分类。
> 1. 流可以分段读、写数据，减少内存消耗和用户等待时间
> 2. 可读流、可写的流、可读写的流、在读写过程中可以修改和变换数据的 Duplex 流 

5. 在数据封装与解封装过程中，针对应用层、传输层、网络层、数据链路层、物理层5层分别做了什么事情？
> 1. 应用层：应用层为操作系统或网络应用程序提供访问网络服务的接口。
> 2. 传输层：提供了主机应用程序进程之间的端到端的服务，对数据进行重组和矫正
> 3. 网络层：通过通信网络进行信息传输
> 4. 数据链路层：将源自网络层来的数据可靠地传输到相邻节点的目标机网络层。
> 5. 物理层：物理层确保原始的数据可在各种物理媒体上传输。
---
## 代码题
1. 统计指定目录中文件总大小。要考虑目录中还有子目录的情况。可以同步编码，异步更好。
```js
const fs = require('fs').promises;
const path = require('path');

async function readSize(dir) {
    if (!dir) dir = __dirname;
    let allSize = 0;
    async function calc(dir) {
        const statObj = await fs.stat(dir);
        if (statObj.isFile()) {
            allSize += statObj.size;
            console.log('add====', allSize)
        } else if (statObj.isDirectory()) {
            const dirs = await fs.readdir(dir);
            for (const d of dirs) {
                if (d) {
                    await calc(path.join(dir, d));
                }
            }
        }
    }
    await calc(dir);
    console.log('finall=====', allSize)
}
readSize();

```
2. 编写单向链表类并且实现队列的入列出列操作。
```js
class Node {
    constructor(data, next) {
        this.data = data;
        next && (this.next = next);
    };
}
class LinkList {
    constructor(head, size) {
        this.head = head || new Node();
        this.size = size || 0;
    }
    push (data) {
        let next = this.head;
        while(next && next.next) {
            next = next.next;
        }
        next.next = new Node(data);
    }
    shift() {
        if (this.head) {
            this.head = this.head.next;
        }
    }
}
```
3. 基于Node写出一静态服务器。接收请求并且响应特定目录(服务器目录)中的html、css、js、图片等资源。
```js
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises;
const {createReadStream} = require('fs');
const mime = require('mime');
const ejs = require('ejs');
const { promisify } = require('util');

function mergeConfig(config) {
    return {
        port: 1234,
        directory: process.cwd(),
        ...config,
    }
}

class Server {
    constructor(config) {
        this.config = mergeConfig(config);
    }
    start() {
        // console.log('服务端已经运行了')
        let server = http.createServer(this.serverHandle.bind(this));
        server.listen(this.config.port, () => {
            console.log('服务端启动了');
        })
    }
    async serverHandle(req, res) {
        // console.log('有请求进来了')
        let {pathname} = url.parse(req.url);
        pathname = decodeURIComponent(pathname);
        let absPath = path.join(this.config.directory, pathname);
        try {
            let statObj = await fs.stat(absPath);
            console.log(absPath);
            if (statObj.isFile()) {
                this.fileHandle(req, res, absPath);
            } else {
                let dirs = await fs.readdir(absPath);
                dirs = dirs.map(item => {
                    return {
                        path: path.join(pathname, item),
                        dirs: item
                    }
                })
                // console.log(dirs)
                let renderFile = promisify(ejs.renderFile);
                let parentPath = path.dirname(pathname);
                let ret = await renderFile(path.resolve(__dirname, 'template.html'), {
                    arr: dirs,
                    parent: pathname === '/' ? '' : '上一层',
                    parentPath,
                    title: path.basename(absPath)
                });
                res.end(ret);
            }
        } catch (error) {
            this.errorHandle(req, res, error);            
        }
    }
    fileHandle(req, res, absPath) {
        res.statusCode = 200;
        res.setHeader('Content-type', `${mime.getType(absPath)};charset=utf-8`);
        createReadStream(absPath).pipe(res);
    }
    errorHandle(req, res, err) {
        res.statusCode = 404;
        res.setHeader('Content-type', 'text/html;charset=utf-8');
        res.end('Not Found');
    }
}

module.exports = Server;
```