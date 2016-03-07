---
layout: post
title: HDFS Metadata - Namenode
tags: hadoop hdfs metadata namenode
categories: Hadoop
---
<div class="toc"></div>
In this article I will explain how namenode maintains metadata information in directory configured using **dfs.namenode.name.dir** in **hdfs-site.xml** file.
In my case **dfs.namenode.name.dir** is configured to **/hadoop/hdfs/namenode** location. So lets start with listing on this directory.

```bash
ls -1 /hadoop/hdfs/namenode
current
in_use.lock
```
There are two entries namely
#### in_use.lock :
This is lock file held by namenode process. It is used to prevent concurrent modification of directory by multiple namenode processes.


**current:**
This is directory. Lets do listing on this

```bash
ls -1 /hadoop/hdfs/namenode/current
VERSION
edits_0000000000000138313-0000000000000138314
edits_0000000000000138315-0000000000000138316
edits_0000000000000138317-0000000000000138318
edits_0000000000000138319-0000000000000138320
edits_0000000000000138321-0000000000000138322
edits_0000000000000138323-0000000000000138324
edits_inprogress_0000000000000138325
fsimage_0000000000000137650
fsimage_0000000000000137650.md5
fsimage_0000000000000138010
fsimage_0000000000000138010.md5
seen_txid
```

There are lot of files, lets explore one by one.


#### VERSION:
This is a Storage information file with following content:
```bash
#Wed Dec 02 13:16:31 IST 2015
namespaceID=2109784471
clusterID=CID-59aae9cc-88c7-4cf7-ada2-6c6490c98c97
cTime=0
storageType=NAME_NODE
blockpoolID=BP-1469059006-127.0.0.1-1449042391563
layoutVersion=-63
```

You can refer to `org.apache.hadoop.hdfs.server.common.StorageInfo.java` and `org.apache.hadoop.hdfs.server.common.Storage.java` for more information.

> ##### namespaceID:
Unique namespace identifier assigned to the file system after hdfs format. This is stored on all nodes of cluster. This is essential to join cluster, datanode with different namespaceID is not allowed to join cluster.

> ##### clusterID:
It identifies a cluster, and it has to be unique during the life time of a cluster. This is important for federated deployment. Introduced in [HDFS\-1365](https://issues.apache.org/jira/browse/HDFS-1365)

> ##### cTime:
creation time of file system, this field is updated during HDFS upgrades.

> ##### storageType:
storageType can be one of NAME\_NODE OR JOURNAL\_NODE ( one of the `org.apache.hadoop.hdfs.server.common.NodeType` exclude DATA\_NODE.)

> ##### blockpoolID:
Unique identifier of storage block pool.This is important for federated deployment. Introduced in [HDFS\-1365](https://issues.apache.org/jira/browse/HDFS-1365)

> ##### layoutVersion:
Layout version of storage data. Whenever new features related to metadata are added to HDFS project, this version is changed.


#### edits\_0000000000000abcdef-0000000000000uvwxyz ( edits\_startTransactionID-endTransactionID):
This file contains all edit log transactions information between startTransactionID to endTransactionID. Its a log of each file system change like file creation,deletion or modification.


#### edits\_inprogress_0000000000000138325 (edits\_inprogress_startTransactionID):
Current edit log file. This file contains edit logs starting from startTransactionID. All the new transactions are appended to this file.


#### fsimage\_0000000000000abcdef ( fsimage\_endTransactionID):
This file contains the complete state of the file system at a point in time, in this case till endTransactionID.


#### fsimage\_0000000000000abcdef.md5 ( fsimage\_endTransactionID.md5):
It is MD5 checksum of fsimage\_endTransactionID file, used to prevent from disk corruption.


#### seen\_txid:
The last transactionID of last checkpointing or edit logs roll. This file is updated when fsimage is merged with edits file or a new edits file is created.
This is used to verify if edits are missing at the time of startup.



