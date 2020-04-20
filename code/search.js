// ==UserScript==
// @name         聚合搜索
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  整合大部分网页搜索，提高搜索效率
// @author       Peng Shiyu
// @website      https://www.pengshiyu.com/

// @match        https://www.baidu.com/s*
// @match        https://cn.bing.com/search*
// @match        https://www.so.com/s*
// @match        https://www.sogou.com/web*
// @match        https://www.google.com.hk/search*
// @match        https://fanyi.sogou.com/*

// @grant        unsafeWindow
// @grant        window.onload
// ==/UserScript==

// @require      file:///Users/hina/workspace/www.farthe.com/code/search.js

// JS获取url参数
function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let pairs = query.split("&");
    for (let pair of pairs) {
        let [key, value] = pair.split("=");
        if (key == variable) {
            return decodeURIComponent(value);
        }
    }
    return null;
};

// 从url中获取搜索关键词
function getKeywords() {
    let keywords = '';

    for (let item of urlMapping) {
        if (item.testUrl.test(window.location.href)) {
            keywords = getQueryVariable(item.keyName);
            break
        }
    }

    console.log(keywords);
    return keywords;
};

// 搜索网址配置
const urlMapping = [{
        name: '百度',
        searchUrl: 'https://www.baidu.com/s?wd=',
        keyName: 'wd',
        testUrl: /https:\/\/www\.baidu\.com\/s.*/,
    },
    {
        name: '必应',
        searchUrl: 'https://cn.bing.com/search?q=',
        keyName: 'q',
        testUrl: /https:\/\/cn\.bing\.com\/search.*/,
    }, {
        name: '360',
        searchUrl: 'https://www.so.com/s?q=',
        keyName: 'q',
        testUrl: /https:\/\/www\.so\.com\/s.*/,
    },
    {
        name: '搜狗',
        searchUrl: 'https://www.sogou.com/web?query=',
        keyName: 'query',
        testUrl: /https:\/\/www\.sogou\.com\/web.*/,
    },
    {
        name: 'Google',
        searchUrl: 'https://www.google.com.hk/search?q=',
        keyName: 'q',
        testUrl: /https:\/\/www.google.com.hk\/search.*/,
    },
    {
        name: '翻译',
        searchUrl: 'https://fanyi.sogou.com/?keyword=',
        keyName: 'keyword',
        testUrl: /https:\/\/fanyi.sogou.com\/.*/,

    }


];

function addBox() {
    let keywords = getKeywords();

    // 主元素
    let div = document.createElement('div')
    div.id = 'search-app-box'
    div.style = "position: fixed; top: 120px; left: 20px; width: 80px; background-color: #EEEEEE; font-size: 12px;z-index: 99999;"
    document.body.appendChild(div)

    // 标题
    let title = document.createElement('span')
    title.innerText = "聚合搜索"
    title.style = "display: block; text-align: center; margin-top: 10px; font-size: 14px; font-weight: bold;"
    div.appendChild(title)

    // 搜索列表
    for (let index in urlMapping) {

        let item = urlMapping[index];

        // 样式
        let style = "display: block; padding: 10px 0 10px 20px; text-decoration: none;";
        let defaultStyle = style + "color: #333333;";
        let hoverStyle = style + "color: #ffffff; background-color: #666666;";

        let a = document.createElement('a')
        a.href = item.searchUrl + keywords
        a.innerText = item.name
        a.style = defaultStyle
        a.id = index

        // 鼠标移入移除效果，相当于hover
        a.onmouseenter = function () {
            this.style = hoverStyle
        }
        a.onmouseleave = function () {
            this.style = defaultStyle
        }

        div.appendChild(a)
    }
};

function readState(data) {
    alert(data.id);
};

(function () {
    'use strict';
    window.onload = addBox;

    window.addEventListener('popstate', function (event) {
        readState(event.state);
    });
})();