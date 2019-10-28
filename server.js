const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const LruCache= require('lru-cache');

const dev = process.env.NODE_ENV === 'development';
const app = next({ dev , quiet: false });
const handle = app.getRequestHandler();

const routes = require('./routes');
const pageRoutes = require('./routes/pages');

// 定义缓存大小时间
const ssrCache = new LruCache({
    max: 1000,
    maxAge: 60 * 60 * 1000 // ms
});

app.prepare().then(() => {
    const server = express();
    // 中间件
    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    // 处理统一返回请求
    // ......
    server.use(function(req, res, _next) {
        if(req.originalUrl.split('.') === -1) {
            console.log(req.method, req.originalUrl, res.statusCode);
        }
        _next();
    });

    // 注册路由
    server.use('/', routes);

    // 注册页面路由
    pageRoutes.forEach(route => {
        server.get(route.routeRule, async (req, res) => {
            // renderAndCache(req, res, route.page, route.query);
            return app.render(req, res, route.page, req.query);
        });
    });

    server.get('*', (req, res) => handle(req, res));

    // 监听服务
    server.listen(3000, err => {
        if(err) throw err;
        
        console.log(`[${process.env.NODE_ENV}] running on http://localhost:3000`);
    })
}).catch(err => {
    console.log(err);
});

const getCacheKey = req => `${ req.url }`;

async function renderAndCache(req, res, pagePath, pageParams) {
    const key = getCacheKey(req);
    // 判断缓存是否命中
    if(ssrCache.has(key)) {
        res.setHeader('x-cache', 'HTI');
        // res.send(ssrCache.has(key));
        console.log(`cached: ${ssrCache.has(key)}`);
        return;
    }

    try {
        const html = app.renderToHTML(req, res, pagePath, pageParams);
        // 请求错误，跳过缓存
        if(res.statusCode !== 200) {
            res.send(html);
            return;
        }
        // 请求通过，缓存页面
        ssrCache.set(key, html);
        res.setHeader('x-cache', 'MISS');
        res.send(html);
    } catch (err) {
        app.renderError(req, res, pagePath, pageParams);
    }

}

