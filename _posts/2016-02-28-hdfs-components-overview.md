---
layout: post
title: HDFS - Components Overview
tags: hadoop hdfs
categories: Hadoop
---

In this article I will explain main components of Hadoop Distributed File System (HDFS) and their responsibilities.

##1) Namenode:

   + A single server which stores metadata i.e (namespace and inodes details)
   + Namespace is hierarchy of files and directories , represented using inodes.
   + Inode holds information like permissions, modification and access time, name, disk quota, named quota, blocks etc.
   + It maintains mapping of namespace to machine list where the actual data is located.
   + Keeps entire namespace in memory.
   + Namenode keeps all metadata in two files namely
       + fsimage
       + edits. 

##2) Datanode:

  + Stores series of named blocks where each block replica has 2 files
  	* first file contains data
    * second file contains blocks metadata like checksum of data and generation time stamp.
  + Allows clients to read / write / delete blocks data.
  + Based on namenodes instruction it also copies block from one datanode to another.
  + On startup datanode sends full block report to namenode, later on periodically sends incremental block reports.
  + It periodically (per 3 seconds) sends a heartbeat to namenode.
  + Namenode marks a datanode as a dead node, if it does not receive hearbeat in 10 minutes (configurable)
  + Along with heartbeat datanode sends information about
       * total storage capacity
       * storage capacity in use
       * number of data transfers currently in progress.

##3) Checkpoint Node:

  + A node which periodically combines the existing checkpoint and the journal to create a new checkpoint and an empty journal
  + It downloads the current checkpoint and the journal files from the namenode, merges these two locally and finally returns the new checkpoint back to the namenode.

##4) Backup Node:

  + Is considered as read only namenode.
  + it is capable to maintain an in-memory, up-to-date image of the file system namespace which is always synchronized with the state of the NameNode
  + It is always ready to accept the journal stream of the namespace transactions from the active NameNode. It then saves them in the journal on its own storage directories, and then applies these transactions on its own namespace image in the memory.
  + The NameNode treats the BackupNode as journal storage, in the same way as it treats the journal files in its storage directories.
  + If the NameNode fails for any reason, the BackupNode’s image in the memory and the checkpoint on disk is a record of the latest namespace state.

##5) HDFS Client:

  + A client exposed to perform file operations like
     *  read, write and delete files
     *  create and delete directories

Will cover the details of each operations in next blogs.