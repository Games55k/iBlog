---
title: MVC模型
published: 2026-03-31
description: 'MVC模型（Model-View-Controller）是一种经典的软件架构设计模式'
image: ''
tags: [规范]
category: 'Code'
pinned: false
draft: false 
lang: ''
---

MVC 是一种非常经典的软件架构模式，全称是 **Model–View–Controller（模型-视图-控制器）**，主要用于把应用程序的不同职责分离，让代码更清晰、可维护。

# 一、MVC 分别是什么？

## 1️⃣ Model（模型）—— 数据与业务逻辑层

* 管理数据（比如数据库里的用户信息）
* 处理业务规则（比如注册、计算、校验等）
* 不关心界面长什么样

📌 举例：用户表、订单数据、登录逻辑

---

## 2️⃣ View（视图）—— 用户界面层

* 显示数据（HTML 页面、UI 界面）
* 不处理复杂逻辑
* 尽量只做“展示”

📌 举例：网页页面、APP界面、表格、按钮

---

## 3️⃣ Controller（控制器）—— 控制与逻辑协调层

* 接收用户输入（点击、请求）
* 调用 Model 处理数据
* 把结果交给 View 展示

📌 举例：登录处理、表单处理、路由控制

---

# 二、MVC 的工作流程

用一个“用户登录”的例子说明👇

1. 用户在页面（View）输入账号密码，点击登录
2. 请求发送到 Controller
3. Controller 调用 Model 验证账号密码
4. Model 返回结果（成功/失败）
5. Controller 把结果交给 View
6. View 显示登录成功或错误提示

👉 流程总结：

```
用户 → View → Controller → Model → Controller → View → 用户
```

---

# 三、为什么要用 MVC？

核心目的：**解耦（分离职责）**

### ✅ 1. 代码更清晰

不同功能放在不同层：

* 数据 → Model
* 页面 → View
* 控制逻辑 → Controller

---

### ✅ 2. 更容易维护

* 改界面 → 不影响业务逻辑
* 改逻辑 → 不影响 UI

---

### ✅ 3. 更容易团队协作

* 前端 → 主要写 View
* 后端 → 主要写 Model + Controller

---

# 四、简单类比

把 MVC 想成一家餐厅 🍽️：

* **View（服务员）** 👉 给你菜单 & 上菜
* **Controller（点菜员）** 👉 帮你把需求传给厨房
* **Model（厨房）** 👉 真正做菜

流程：

你点菜 → 服务员 → 点菜员 → 厨房 → 点菜员 → 服务员 → 你吃到菜

---

# 总结

👉 MVC 就是：

**把“数据（Model）”、“界面（View）”、“控制逻辑（Controller）”分开管理的一种设计模式。**
