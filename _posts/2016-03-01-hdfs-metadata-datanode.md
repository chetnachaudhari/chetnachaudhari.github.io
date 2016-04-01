---
layout: post
title: HDFS Metadata - Datanode
tags: hadoop hdfs metadata datanode
categories: Hadoop
---
<div class="toc"></div>
In this article I will explain how datanode maintains metadata information in directory configured using **dfs.datanode.name.dir** in **hdfs-site.xml** file.
In my case **dfs.datanode.name.dir** is configured to **/hadoop/hdfs/datanode** location. So lets start with listing on this directory.

```bash
ls -1 /hadoop/hdfs/datanode
current
in_use.lock
```
There are two entries namely
#### in_use.lock :
This is lock file held by datanode process. It is used to prevent concurrent modification of directory by multiple datanode processes.


**current:**
This is directory. Lets do tree listing on this

```bash
tree current/
current/
|-- BP-1469059006-127.0.0.1-1449042391563
|   |-- current
|   |   |-- VERSION
|   |   |-- finalized
|   |   |   `-- subdir0
|   |   |       `-- subdir0
|   |   |           |-- blk_1073741825
|   |   |           `-- blk_1073741825_1001.meta
|   |   |-- rbw
|   |-- dncp_block_verification.log.curr
|   |-- dncp_block_verification.log.prev
|   `-- tmp
`-- VERSION
```

There are lot of files and directories, lets explore one by one.


#### VERSION:
This is a Storage information file with following content:

```bash
#Wed Dec 02 13:16:39 IST 2015
storageID=DS-c25c62e1-a512-451e-87b2-e9175afca9f4
clusterID=CID-59abe9cc-89c7-4cf8-ada2-6c6409c98c97
cTime=0
datanodeUuid=ad7ecbe4-b4a2-4b52-8146-5240ec849119
storageType=DATA_NODE
layoutVersion=-56
```

You can refer to `org.apache.hadoop.hdfs.server.common.StorageInfo.java` and `org.apache.hadoop.hdfs.server.common.Storage.java` for more information.

> ##### storageID:
It is unique to the datanode, and same across all storage directories on datanode. Namenode uses this id, to uniquely identify the datanode.

> ##### clusterID:
It identifies a cluster, and it has to be unique during the life time of a cluster. This is important for federated deployment. Introduced in [HDFS\-1365](https://issues.apache.org/jira/browse/HDFS-1365)

> ##### cTime:
creation time of file system, this field is updated during HDFS upgrades.

> ##### datanodeUuid:
Unique identifier of a datanode, introduced in [HDFS\-5233](https://issues.apache.org/jira/browse/HDFS-5233)

> ##### storageType:
It'll be DATA_NODE.

> ##### layoutVersion:
Layout version of storage data. Whenever new features related to metadata are added to HDFS project, this version is changed.


#### BP\-randomInteger\-NameNodeIpAddress\-creationTime:
This is unique block pool id, where BP stands for Block Pool, it is followed by unique random integer, IP address of namenode and block pool creation time.Block pool collects a set of blocks whihc belongs to a namespace.

##### finalized:
This directory contains block which are completed. Each block file contains hdfs data.

##### rbw:
This directory contains blocks that are still being written to by HDFS client. Here rbw stands for replic being written.

##### dncp_block_verification.log.*:
This file tracks the last time each block was verified by comparing its contents against the checksum. This file is rolled periodically, so `dncp_block_verification.log.curr` is current file and `dncp_block_verification.log.prev` this is old file which has been rolled back.
Background block verification work happens in ascending order of last verification time.



