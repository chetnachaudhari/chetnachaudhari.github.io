---
layout: post
title: How to enable debugfs on linux system.
tags: bash
categories: Linux
---
<div class="toc"></div>

Debugfs is Debug Filesystem , its RAM based filesystem which can be used for kernel debugging information. This makes kernel space information available in user space.

* How to enable debugfs : *

To enable it for onetime, i.e information will be available until next boot of system.

```bash
mount -t debugfs none /sys/kernel/debug
```

To make the change permanent, add following line to `/etc/fstab` file.

```bash
debugfs    /sys/kernel/debug      debugfs  defaults  0 0
```

Once you enable debugfs, you can see multiple directories inside `/sys/kernel/debug` :

```bash
[root@sandbox ~]# ls /sys/kernel/debug
bdi    boot_params  dynamic_debug  gpio  kprobes  sched_features  usb  xen
block  dma_buf      extfrag        hid   mce      tracing         x86
```

These files holds information about kernel subsystems which helps in debugging.