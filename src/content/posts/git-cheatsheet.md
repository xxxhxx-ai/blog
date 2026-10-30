---
title: Git 命令速查（我的个人笔记）
description: 只记我真正用得到的 15 条。按「我在干什么」分类，不按命令名分类。
pubDate: 2026-09-05
category: 学习笔记
tags: ["Git", "速查", "笔记"]
index: "07"
---

网上 Git 教程都是按命令分类的，但我在终端里想的是"我要干什么"。所以按**意图**重排了一遍。

## 我想撤销刚才的修改

```bash
git restore <file>          # 丢弃工作区某个文件的修改
git restore .               # 丢弃所有修改（危险）
git restore --staged <file> # 取消暂存，但保留修改
```

## 我改完想退回上一个版本

```bash
git reset --hard HEAD       # 丢弃所有未提交改动（危险）
git reset --soft HEAD~1     # 撤销上一次提交，改动保留在暂存区
git revert <commit>         # 生成一个反向提交（已推送时用这个）
```

> `--hard` 会真的删掉你的东西。用之前先 `git stash`。

## 我想看看发生了什么

```bash
git log --oneline --graph   # 一眼看清分支结构
git diff                    # 工作区和暂存区的差别
git diff --staged           # 暂存区和上次提交的差别
git status -sb              # 简洁状态
```

## 我在分支上出了事

```bash
git switch -c <branch>      # 新建并切换（推荐，取代 checkout -b）
git switch main             # 切回主分支
git merge <branch>          # 合并进来
git rebase main             # 把当前分支的提交挪到 main 之后
git stash                   # 临时存一下手上的活
git stash pop               # 拿回来
```

## 我推不上去了

```bash
git pull --rebase           # 拉取并变基，历史更干净
git push -u origin <branch> # 首次推送，绑定远程分支
```

如果提示 `rejected`，先 `pull --rebase`，别急着 `push -f`。

## 三个容易忘的

```bash
git commit --amend          # 改上一次提交的说明（还没推送时）
git bisect start            # 二分查找是哪个提交引入的 bug
git reflog                  # 找回"消失"的提交，救命用
```

`git reflog` 是最值得记住的一条。误操作 `reset --hard` 之后，几乎都能从这里捞回来。
