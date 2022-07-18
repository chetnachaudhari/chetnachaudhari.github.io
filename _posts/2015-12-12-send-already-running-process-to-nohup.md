---
title: Moving already running process under nohup.
tags: bash
categories: Linux
read_time: false
comments: true
share: true
related: true
---

Have you ever ran into a situation, where you have launched a long running process and you forgot to run it under nohup.
Here is a workaround to move already running process under nohup.You can do this using bash job control.

### Steps:
1. First stop or pause the process using `Ctrl` and `Z` .
2. Then type ```bg``` in terminal to move that process in background.
3. Last step is to remove process entry from table of active jobs. You can do this with following command

```bash
disown -h
```

You can mention specific job id after -h option to remove particular entry from active jobs table.