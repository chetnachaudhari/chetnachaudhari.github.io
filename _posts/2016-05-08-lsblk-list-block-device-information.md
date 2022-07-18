---
title: "lsblk - List block device information."
tags: bash
categories: Linux
read_time: false
comments: true
share: true
related: true
---

Lsblk is a linux utility to list block device information. In this blog post, I'll cover some useful `lsblk` commands.

### To see list of devices :
```bash
[root@sandbox ~]# lsblk
NAME                          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda                             8:0    0 48.8G  0 disk
|-sda1                          8:1    0  500M  0 part /boot
`-sda2                          8:2    0 48.3G  0 part
  |-vg_sandbox-lv_root (dm-0) 253:0    0 43.5G  0 lvm  /
  `-vg_sandbox-lv_swap (dm-1) 253:1    0  4.9G  0 lvm  [SWAP]
```

By default `lsblk` prints information in tree view, if you want to see information in list view, you can use `-l` option.

```bash
[root@sandbox ~]# lsblk -l
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda                         8:0    0 48.8G  0 disk
sda1                        8:1    0  500M  0 part /boot
sda2                        8:2    0 48.3G  0 part
vg_sandbox-lv_root (dm-0) 253:0    0 43.5G  0 lvm  /
vg_sandbox-lv_swap (dm-1) 253:1    0  4.9G  0 lvm  [SWAP]
```

Here,

> * **NAME** is name of device ,
> * **MAJ:MIN** is major:minor version of device
> * **RM** tells that its a removal device
> * **SIZE** is size of device in human readable format
> * **RO** tells that its Read Only device
> * **TYPE** is device type
> * **MOUNTPOINT** is location where device is mounted.


### To see device size in bytes

```bash
[root@sandbox ~]# lsblk -b
NAME                          MAJ:MIN RM        SIZE RO TYPE MOUNTPOINT
sda                             8:0    0 52428800000  0 disk
|-sda1                          8:1    0   524288000  0 part /boot
`-sda2                          8:2    0 51903463424  0 part
  |-vg_sandbox-lv_root (dm-0) 253:0    0 46657437696  0 lvm  /
  `-vg_sandbox-lv_swap (dm-1) 253:1    0  5242880000  0 lvm  [SWAP]
```

### To see filesystem information

```bash
[root@sandbox ~]# lsblk -fl
NAME                      FSTYPE      LABEL UUID                                   MOUNTPOINT
sda
sda1                      ext4              8ed32b8c-b23a-423b-b96f-29eaa1303ae1   /boot
sda2                      LVM2_member       6CXjrD-6st6-olYP-BQAK-psA0-dS3T-8KeIRU
vg_sandbox-lv_root (dm-0) ext4              d6e7730a-608a-4e67-8814-131e23411619   /
vg_sandbox-lv_swap (dm-1) swap              dc07cc2c-1b35-4b06-a52b-c0d162669afe   [SWAP]
```

Here

> * **FSTYPE** is filesystem type
> * **LABEL** is filesystem label
> * **UUID** is filesystem UUID

### To see device permissions
```bash
[root@sandbox ~]# lsblk -m
NAME                           SIZE OWNER GROUP MODE
sda                           48.8G root  disk  brw-rw----
|-sda1                         500M root  disk  brw-rw----
`-sda2                        48.3G root  disk  brw-rw----
  |-vg_sandbox-lv_root (dm-0) 43.5G root  disk  brw-rw----
  `-vg_sandbox-lv_swap (dm-1)  4.9G root  disk  brw-rw----
```

Here,

> * **OWNER** is user who created this device
> * **GROUP** is group name to which user belongs
> * **MODE** is device permissions


### To see device topology information
```bash
[root@sandbox ~]# lsblk -tl
NAME                      ALIGNMENT MIN-IO OPT-IO PHY-SEC LOG-SEC ROTA SCHED RQ-SIZE   RA
sda                               0    512      0     512     512    1 cfq       128  128
sda1                              0    512      0     512     512    1 cfq       128  128
sda2                              0    512      0     512     512    1 cfq       128  128
vg_sandbox-lv_root (dm-0)         0    512      0     512     512    1           128  128
vg_sandbox-lv_swap (dm-1)         0    512      0     512     512    1           128  128
```

Here,

> * **ALIGNMENT** is alignment offset of device
> * **MIN-IO** is minimum I/O size
> * **OPT-IO** is optimal I/O size
> * **PHY-SEC** is physical sector size
> * **LOG-SEC** is logical sector size
> * **ROTA** tells that its a rotational device
> * **SCHED** is name of I/O scheduler
> * **RQ-SIZE** is size of request queue
> * **RA** is read ahead of device.


