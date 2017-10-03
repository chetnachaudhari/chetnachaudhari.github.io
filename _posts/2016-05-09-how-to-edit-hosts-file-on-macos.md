---
layout: post
title: How to edit hosts file on MacOS
tags: MacOS
description: How to edit hosts file on MacOS
keywords: MacOS, linux, bash
categories: MacOS
---
<div class="toc"></div>
On MacOS, hosts file is present at two places i.e `/etc/hosts` and `/private/etc/hosts`. Bit if you do detailed listing on `/etc` path, you will notice that its pointing to `/private/etc/hosts` file.

```bash
chetnachaudhari@chetnas-MacBook-Pro:~$ ls -lsa /etc
8 lrwxr-xr-x@ 1 root  wheel  11 Jan 12  2017 /etc -> private/etc
```

To update new hosts entry on your machine, edit `/private/etc/hosts` file. Following is sample of how this file looks:

```bash
chetnachaudhari@chetnas-MacBook-Pro:~$ cat /private/etc/hosts
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
```
