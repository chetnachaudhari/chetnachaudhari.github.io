---
layout: post
title: Error during apt-get update - Can't exec "insserv"
tags: bash
categories: Linux
---
Today, While doing an apt-get update on a box, I faced the following issue:

Setting up initscripts (2.88dsf-34) ...
Can't exec "insserv": No such file or directory at /usr/sbin/update-rc.d line 406.
update-rc.d: error: insserv rejected the script header
dpkg: error processing initscripts (--configure):
subprocess installed post-installation script returned error exit status 255

This was the first time I was seeing this issue, so was curious to know,  what is insserv?.  Insserv command is used to control the start and stop order of the services that are on a Linux system. How I fixed the problem? After checking the details about this, I found that insserv symlink was broken. 

```bash
sudo ln -s /usr/lib/insserv/insserv /sbin/insserv 
```

above command fixed the issue. 