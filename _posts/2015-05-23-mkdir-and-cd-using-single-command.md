---
layout: single
title: "Do mkdir and cd using a single command?"
tags: bash
description:  Do mkdir and cd using a single command?
keywords: mkdir, cd, linux, bash
categories: Linux
---

Most of the times, when you create a new directory, you may cd to it, to do some work.

```bash
chetna.chaudhari@Chetna:~$ mkdir -p /a/b/c
chetna.chaudhari@Chetna:~$ cd /a/b/c
chetna.chaudhari@Chetna:~$ pwd
/a/b/c
```

How about combining these two commands into a single one.? yes its doable. You need to add following snippet to your `.bash_profile` file and relaunch a shell.

```bash
function mkdircd () { mkdir -p "$@" && eval cd "\"\$$#\""; }
```
Now do `mkdir` and `cd` using a single command

```
chetna.chaudhari@Chetna:~$ mkdircd /x/y/z
chetna.chaudhari@Chetna:~$ pwd
/x/y/z
```
.