---
layout: post  
title: How to install redis on MacOS using Homebrew
tags: bash
description: How to install redis on MacOS using Homebrew
keywords: redis, homebrew
categories: Linux  
---
<div class="toc"></div>
Using homebrew you can install redis on MacOS. This article will cover how to install and start redis.
Hit the following command to install redis

``` bash
$ brew install redis
```

### Get redis package information:

```bash
$ brew info redis
```

### Launch Redis on computer startup:

```bash
$ ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
```

### Start redis server using `launchctl`:

```bash
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

### Start redis server using configuration file:

```bash
$ redis-server /usr/local/etc/redis.conf
```
Here `/usr/local/etc/redis.conf` is the location of redis configuration file. You can pass different path.

### Stop redis on auto startup:

```bash
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

### To uninstall redis:

```bash
$ brew uninstall redis
$ rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

### Test if redis server is up or not:

```bash
$ redis-cli ping
```
This command should return `PONG` response.
