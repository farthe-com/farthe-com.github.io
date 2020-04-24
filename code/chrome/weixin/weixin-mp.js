// ==UserScript==
// @name         微信公众号后台
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  整合大部分网页搜索，提高搜索效率
// @author       Peng Shiyu
// @website      https://www.pengshiyu.com/

// @match        *://mp.weixin.qq.com/cgi-bin/home*

// @grant        unsafeWindow
// @grant        window.onload
// ==/UserScript==

// @require      file:///Users/hina/workspace/www.farthe.com/code/chrome/weixin/weixin-mp.js

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


/**
 * 一键粘贴
 * @param  {String} id [需要粘贴的内容]
 * @param  {String} attr [需要 copy 的属性，默认是 innerText，主要用途例如赋值 a 标签上的 href 链接]
 *
 * range + selection
 *
 * 1.创建一个 range
 * 2.把内容放入 range
 * 3.把 range 放入 selection
 *
 * 注意：参数 attr 不能是自定义属性
 * 注意：对于 user-select: none 的元素无效
 * 注意：当 id 为 false 且 attr 不会空，会直接复制 attr 的内容
 */
function copyText(id, attr) {
    let target = null;

    if (attr) {
        target = document.createElement('div');
        target.id = 'tempTarget';
        target.style.opacity = '0';
        if (id) {
            let curNode = document.querySelector('#' + id);
            target.innerText = curNode[attr];
        } else {
            target.innerText = attr;
        }
        document.body.appendChild(target);
    } else {
        target = document.querySelector('#' + id);
    }

    try {
        let range = document.createRange();
        range.selectNode(target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        console.log('复制成功')
    } catch (e) {
        console.log('复制失败')
    }

    if (attr) {
        // remove temp target
        target.parentElement.removeChild(target);
    }
}

// 添加节点
function addBox() {
    // 主元素
    var div = document.createElement('div')
    div.id = 'search-app-box'
    div.style = "position: fixed; top: 120px; right: 20px; width: 120px; background-color: #EEEEEE; font-size: 12px;z-index: 99999;"
    // document.body.appendChild(div)
    document.body.insertAdjacentElement("afterBegin", div);

    // 标题
    let title = document.createElement('span')
    title.innerText = "微信公众号后台"
    title.style = "display: block; text-align: center; margin-top: 10px; font-size: 14px; font-weight: bold;"
    div.appendChild(title)

    // 功能按钮
    let a = document.createElement('a')
    a.innerText = "获取cookie"
    // a.innerText = document.cookie
    a.id = 'cookie'
    a.data = document.cookie
    a.href = 'javascript:;'
    a.style = "display: block; text-align: center; margin-top: 10px; font-size: 14px; font-weight: bold;"

    a.onclick = function () {
        copyText('cookie', 'data')
    }
    div.appendChild(a)

};


(function () {
    'use strict';
    addBox();
})();