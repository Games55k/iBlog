---
title: 给非主分支提PR
published: 2026-03-30
description: '如何给开源项目的其他分支贡献代码呢'
image: ''
tags: [Git]
category: 'Code'
pinned: false
draft: false 
lang: ''
---

假设现在有一个你和别人一起维护的开源项目，它有两个分支，一个是主分支 `main`，一个是开发分支 `dev`，我们想先进行开发测试，不想直接发版到 `main` 分支上，如何进行干净利落的提 PR 贡献自己的代码呢？

# 一、Fork + Clone 项目

首先在 GitHub 上 Fork 别人的项目
然后 `git clone` 到本地，并且 `cd` 进入到项目目录中

# 二、添加上游仓库

```bash
git remote add upstream https://github.com/原作者/项目名.git
```
验证：
```bash
git remote -v
```

# 三、拉取 upstream 的 dev 分支

⚠️ 关键点：你要基于 dev 分支开发，而不是 main
```bash
git fetch upstream
git checkout -b dev upstream/dev
```
👉 这一步的意思是：
从 upstream 拉取 dev
本地创建一个 dev 分支，并跟踪 upstream/dev

# 四、基于 dev 创建你的功能分支

不要直接在 dev 上改！直接在 dev 上开发会导致：
- 分支污染
- PR 不清晰

请先建立新的分支：
```bash
git checkout -b feature/xxx
```

# 五、开发 + 提交代码

```bash
git add .
git commit -m "feat: 新增了用户上线的功能"
```

# 六、推送到你的 Fork 仓库
```bash
git push origin feature/xxx
```

# 七、发起 PR

在 GitHub 上：

- base repository：原仓库
- base branch：dev ⚠️
- compare：你的 feature/xxx

👉 确保是：
原仓库: dev  ←  你的仓库: feature/xxx
不要提到 main 分支

# 开发前建议：

请先记得拉取 `dev` 分支的最新代码再进行开发
```bash
git checkout dev
git pull upstream dev
git checkout feature/xxx
git rebase dev  // 让提交历史变得“线性、干净”
```
