var express = require('express'),
    i18n = require("i18n");

const app = express()

// 语言配置
i18n.configure({
    locales: ['en', 'zh'], // 声明包含语言
    directory: __dirname + '/locales', // 设置语言文件目录
    queryParameter: 'lang', // 设置查询参数
    defaultLocale: 'en', // 设置默认语言
});

// 初始化
app.use(i18n.init)


app.get('/', function (req, res) {
    console.log(req.getLocale());
    var hello = res.__('Hello'); // --> Hallo`
    return res.send(hello)
});


app.listen(8000, () => {
    console.log("runing: http://localhost:8000/");
})

/**
 * 默认通过浏览器语言判断
 * 可以通过查询参数指定语言
 * http: //localhost:8000/?lang=zh
 * 
 * https: //www.npmjs.com/package/i18n
 */