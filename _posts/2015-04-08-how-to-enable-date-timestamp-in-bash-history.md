---
layout: post
title: How to enable date timestamp in bash history.
tags: bash
description: How to enable date timestamp in bash history.
keywords: date, timestamp, history, linux, bash
categories: Linux
---
<div class="toc"></div>

Many times while debugging I have a question, when did I execute this command? Here is a way to enable date and timestamp while listing your bash history.


Without date and timestamp, your history will look like

```bash 
chetna.chaudhari@Chetna:~$ history
ps aux
jps
ls
clear
history
```

To enable date and timestamp,


```bash
chetna.chaudhari@Chetna:~$ export HISTTIMEFORMAT='%F %T '
```
Here, %F enables date in yyyy-mm-dd format (%Y-%m-%d) %T enables time in hour:minutes:seconds (%H:%M:%S) So now your history should look like

```bash
chetna.chaudhari@Chetna:~$ history
1  2015-04-08 19:49:35 ps aux
2  2015-04-08 19:49:35 jps
3  2015-04-08 19:49:35 ls
4  2015-04-08 19:49:35 clear
5  2015-04-08 19:49:36 ps aux | grep sshd
6  2015-04-08 19:49:37 history
```

To make it permanent add the export command to your **.bash_profile** file.


