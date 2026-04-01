---
title: Linux 50个必会命令
published: 2025-09-17
description: '常见的五十个 Linux 必会指令'
image: ''
tags: [Linux]
category: 'Code'
draft: false 
lang: ''
---

## 📁 一、文件与目录（最常用）
```bash
ls              # 列出目录
ls -lah         # 详细+隐藏+大小
cd dir          # 进入目录
cd ..           # 上一级
pwd             # 当前路径
mkdir dir       # 创建目录
mkdir -p a/b    # 创建多级目录
rm file         # 删除文件
rm -r dir       # 删除目录
rm -rf dir      # 强制删除（危险）
cp a b          # 复制文件
cp -r dir1 dir2 # 复制目录
mv a b          # 移动/重命名
touch file      # 创建空文件
```
## 📄 二、文件查看与编辑
```bash
cat file        # 查看文件
less file       # 分页查看（推荐）
more file       # 简单分页
head file       # 前10行
tail file       # 后10行
tail -f log     # 实时日志
nano file       # 简单编辑器
vim file        # 高级编辑器
```
## 🔍 三、搜索与查找
```bash
find / -name a.txt      # 查找文件
grep "text" file        # 搜索内容
grep -r "text" .        # 递归搜索
which python            # 命令路径
whereis python          # 查找程序位置
locate file             # 快速查找（需更新数据库）
sudo updatedb           # 更新 locate 数据库
```
## 🔐 四、权限与用户
```bash
chmod 755 file          # 修改权限
chmod +x file           # 添加执行权限
chown user file         # 修改所有者
chgrp group file        # 修改组

sudo adduser user       # 创建用户
sudo deluser user       # 删除用户
su user                 # 切换用户
whoami                  # 当前用户
```
## 📦 五、软件管理（apt）
```bash
sudo apt update         # 更新软件源
sudo apt upgrade        # 升级软件
sudo apt install pkg    # 安装软件
sudo apt remove pkg     # 删除软件
sudo apt purge pkg      # 彻底删除
sudo apt autoremove     # 清理无用依赖
```
## 🖥️ 六、系统信息
```bash
uname -a        # 系统信息
top             # 进程监控
htop            # 更好用（需安装）
ps aux          # 所有进程
free -h         # 内存
df -h           # 磁盘
du -sh dir      # 目录大小
uptime          # 运行时间
```
## 🌐 七、网络命令
```bash
ip addr         # 查看IP
ping google.com # 测试网络
wget URL        # 下载文件
curl URL        # 请求接口
netstat -tulnp  # 端口查看
ss -tulnp       # 更快端口查看
```
## 📦 八、压缩与解压
```bash
tar -czvf a.tar.gz dir   # 压缩
tar -xzvf a.tar.gz       # 解压
zip -r a.zip dir         # zip压缩
unzip a.zip              # 解压zip
```
## 🔄 九、进程管理
```bash
kill PID         # 杀进程
kill -9 PID      # 强制杀
pkill name       # 按名称杀
bg               # 后台运行
fg               # 前台恢复
jobs             # 查看任务
```
## ⭐ 超实用组合（高手常用）
```bash
|                # 管道
>                # 覆盖输出
>>               # 追加输出
&&               # 前成功才执行后
```
例子：
```bash
ls | grep txt  // 列出当前目录中包含“txt”的文件/目录名
cat file >> log.txt  // 把 file 的内容追加到 log.txt 文件末尾
mkdir test && cd test  // 创建目录 test，并进入该目录
```