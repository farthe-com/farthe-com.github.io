express = require('express')

app = express();

// 配置
app.set("twig options", {
    allow_async: true,
    strict_variables: false
});

app.get('/', function (req, res) {
    res.render('index.html', {
        name: "Tom"
    });
});

app.listen(9999);