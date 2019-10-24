---
lang: zh-tw
title: SQL 注入攻擊 (SQLi) 簡介及防範
institute:
- 台灣國立屏東大學
aspectratio: 169
---

# SQL Injection 簡介

## **SQLi 簡介** - 什麼是 SQL 注入攻擊

- SQL 注入攻擊 (SQL Injection/SQLi) 指的是透過應用程式中可輸入的資料中插入或注入 SQL 指令
- SQL 注入攻擊一旦成功允許讓攻擊者...
  - 存取(新增/更新/刪除)資料庫中的機密機料
  - 控制整個資料庫
  - 或甚至影響運行資料庫的作業系統

## **SQLi 簡介** - 常見風險

- PHP 及 ASP 應用程式中仍存於許多較舊的程式呼叫碼
  - SQL 注入攻擊常出現於這些應用程式中
- 此類注入攻擊會因伺服器上的使用者存取權、攻擊者的技術等等而有不同的資安風險
  - 資料庫中常會存放使用者的相關資料，如使用者名稱、密碼、交易資料等
  - 因此 SQLi 風險通常被視為**嚴重影響性**的漏洞

# 常見補強方案

## 前言

- 如前一章節所言，每個補強措施都只是用來幫助防止攻擊者存取我方資料庫的一道防線
  - 以下措施皆可能存有攻擊向量可允許攻擊者存取我方資料庫
  - 正因如此，開發者必須在開發時部下各個防線

## **參數化查詢** - 介紹

- SQL 注入攻擊最大的問題在於「混合程式碼與使用者所提供的資料」
- **參數化查詢**可解決這個問題
  - 參數化查詢指的是將參數進行適當安全性處理後，帶入至已準備好的 SQL 查詢語法中
  - 可增進查詢語法的可讀性

## **參數化查詢** - 簡例

使用 Sequelize 函式庫:

```js
sequelize
    .query('SELECT * FROM users WHERE status = ?', { replacements: ['active'], type: sequelize.QueryTypes.SELECT })
    .then(projects => {
        console.log(projects)
    });
```
```js
sequelize
    .query('SELECT * FROM users WHERE status = :status ', { replacements: { status: 'active' }, type: sequelize.QueryTypes.SELECT })
    .then(projects => {
        console.log(projects)
    });
```

## **資料驗證** - 介紹

- 資料驗證如名所指，為檢驗使用者所提供的資料，並防止有問題的資料混入至查詢語法中
- 較有效的方式為使用**白名單驗證**
  - 僅限較無問題的字元通過驗證
  - 將資料格式轉換為已知且可信任的資料

## **資料驗證** - 簡例

- 電子郵件存放於 SQL 資料庫前須符合 RFC 5321 的規格
  - 檢查字串中是否有 `@`
  - 用戶名部分不可超過 64 個八位元組
  - 網域部分不可超過 255 個八位元組
  - 電子郵件必須是可被寄發的
- 為檢查其寄發性，可寄送電子郵件確認信以確認地址及擁有人的正當性
- 更多範例可於[OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)中取得

## **ORM** - 介紹

- ORM = Object-relational mapping (物件關係對映)
- 通常開發者提及 ORM 時，指的是**實作 ORM 的函式庫**
- 實作 ORM 的函式庫助於操作資料庫相關動作
  - 插入 Table
  - 插入/刪除/更新資料
  - 建立與開發者所用的程式語言相似的查詢語言 (e.g. .NET LINQ)
  - 開發者不須手動寫入 SQL 查詢字串
  - 降低不安全 SQL 字串的產生
  - 減少開發者負擔
- ORM 函式庫可助於不擅於使用 SQL 的開發者輕易地存取資料庫

## **ORM** - 缺點

- ORM 函式庫的主要目的**並非為用於防止 SQL 注入攻擊**所生
  - ORM 仍可因開發者缺失而造成 SQLi 的漏洞
- 網路上已有許多攻擊 ORM 的例子，且持續強調 **ORM 並不是用來防止 SQLi** 的
  - https://bertwagner.com/2018/03/06/2-5-ways-your-orm-will-allow-sql-injection/
  - https://snyk.io/blog/sql-injection-orm-vulnerabilities/
  - https://security.stackexchange.com/questions/80131/how-to-use-orm-correctly-to-prevent-sql-injection

## **ORM** - NodeJS 函式庫

- `sequelize`
- `Bookshelf`
- `TypeORM`

## **ORM** - 簡例

```js
// Sequelize syntax for 'SELECT * FROM post WHERE authorId = 12 OR authorId = 13;'
Post.findAll({
  where: {
    authorId: {
      [Op.or]: [12, 13]
    }
  }
});
```

# 總結

- 每道防線皆有可能有漏洞，但這不代表開發者不應使用其措施進行防範
  - 開發者應實作所有可使用的防範措施
- 於存放資料至資料庫前，開發者必須實作以下措施
  - 使用 **ORM** 或有必要時**參數化查詢**
  - 檢驗使用者提供參數