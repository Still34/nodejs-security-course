---
lang: zh-tw
title: 第一支 Node.js 專案
institute:
- 台灣國立屏東大學
aspectratio: 169
---

# Express 是什麼?

- Express 是套快速及精簡的網頁框架
- 可用於快速設計 RESTful API

## 設計專案前注意事項

- 若有使用 Git...
  * 在安裝 NPM 模組時會產生 `node_modules` 資料夾，此資料夾不需加入至 Git 內
  * package-lock.json 及 package.json 需要加入至 Git 內

# 結合 Express 製作第一支專案

## 設定專案

1. 建立資料夾並在資料夾內開啟終端機
2. 輸入 `npm init`
   * 將設定此專案的 `package.json`
   * 預設輸出檔名為 `index.js`; 建議改為 `app.js`
3. 輸入專案相關資料如專案名稱、版本、作者...等
4. 輸入 `npm install express`
   * 將安裝最新版本的 `Express`

![安裝 Express](img/ch2-npm-install.png)

## Hello World 程式碼

```js
// 尋找名為 "express" 的 Node.js 套件並將其初始化
const express = require('express');
// 創建 express
const app = express();
// 設定 express 在哪一埠聽取 HTTP 請求
const port = 3000;

// 格式：app.get(path, callback [, callback ...])
//      使用指定的 callback 將 HTTP GET 請求調至指定的路徑
//      req 代表收到的 HTTP 請求
//      res 代表要送出去的 HTTP 回應
app.get('/', (req, res) => res.send('Hello World!'));

// 格式：app.listen([port[, host[, backlog]]][, callback])
//      綁定並監測指定埠口上的連接
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

## 結果

1. 於同終端機內執行 `node app.js`
2. 若在瀏覽器中開啟 `http://localhost:3000` 見到 `Hello World` 的字串即代表運行成功

![運行頁面](img/ch2-hello-world-result.png)