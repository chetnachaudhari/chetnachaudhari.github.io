---
layout: single
title: "HDFS Metadata - Configuration Properties"
tags: hadoop hdfs
categories: Hadoop
---

In this article, we will see configuration properties used to decide behaviour of hdfs metadata directories.
All these properties are part of *hdfs-site.xml* file. Description and default values are picked from [hdfs-default.xml](http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml).

### dfs.datanode.data.dir

#### Description:
Determines where on the local filesystem an DFS data node should store its blocks. If this is a comma-delimited list of directories, then data will be stored in all named directories, typically on different devices. The directories should be tagged with corresponding storage types ([SSD]/[DISK]/[ARCHIVE]/[RAM\_DISK]) for HDFS storage policies. The default storage type will be DISK if the directory does not have a storage type tagged explicitly. Directories that do not exist will be created if local filesystem permission allows.

#### Default Value:
file://${hadoop.tmp.dir}/dfs/data

### dfs.namenode.checkpoint.check.period

#### Description:
The SecondaryNameNode and CheckpointNode will poll the NameNode every `dfs.namenode.checkpoint.check.period` seconds to query the number of uncheckpointed transactions.

#### Default Value:
60

### dfs.namenode.checkpoint.period

#### Description:
The number of seconds between two periodic checkpoints.

#### Default Value:
3600

### dfs.namenode.checkpoint.txns

#### Description:
The Secondary NameNode or CheckpointNode will create a checkpoint of the namespace every `dfs.namenode.checkpoint.txns` transactions, regardless of whether `dfs.namenode.checkpoint.period` has expired.

#### Default Value:
1000000

### dfs.namenode.edit.log.autoroll.check.interval.ms

#### Description:
How often an active namenode will check if it needs to roll its edit log, in milliseconds.

#### Default Value:
300000

### dfs.namenode.edit.log.autoroll.multiplier.threshold

#### Description:
Determines when an active namenode will roll its own edit log. The actual threshold (in number of edits) is determined by multiplying this value by `dfs.namenode.checkpoint.txns`. This prevents extremely large edit files from accumulating on the active namenode, which can cause timeouts during namenode startup and pose an administrative hassle. This behavior is intended as a failsafe for when the standby or secondary namenode fail to roll the edit log by the normal checkpoint threshold.

#### Default Value:
2.0

### dfs.namenode.edits.dir

#### Description:
Determines where on the local filesystem the DFS name node should store the transaction (edits) file. If this is a comma-delimited list of directories then the transaction file is replicated in all of the directories, for redundancy. Default value is same as `dfs.namenode.name.dir`

#### Default Value:
${dfs.namenode.name.dir}

### dfs.namenode.name.dir

#### Description:
Determines where on the local filesystem the DFS name node should store the name table(fsimage). If this is a comma-delimited list of directories then the name table is replicated in all of the directories, for redundancy.

#### Default Value:
file://${hadoop.tmp.dir}/dfs/name

### dfs.namenode.num.checkpoints.retained

#### Description:
The number of image checkpoint files (fsimage\_\*) that will be retained by the NameNode and Secondary NameNode in their storage directories. All edit logs (stored on edits\_\* files) necessary to recover an up-to-date namespace from the oldest retained checkpoint will also be retained.

#### Default Value:
2

### dfs.namenode.num.extra.edits.retained

#### Description:
The number of extra transactions which should be retained beyond what is minimally necessary for a NN restart. It does not translate directly to file's age, or the number of files kept, but to the number of transactions (here "edits" means transactions). One edit file may contain several transactions (edits). During checkpoint, NameNode will identify the total number of edits to retain as extra by checking the latest checkpoint transaction value, subtracted by the value of this property. Then, it scans edits files to identify the older ones that don't include the computed range of retained transactions that are to be kept around, and purges them subsequently. The retainment can be useful for audit purposes or for an HA setup where a remote Standby Node may have been offline for some time and need to have a longer backlog of retained edits in order to start again. Typically each edit is on the order of a few hundred bytes, so the default of 1 million edits should be on the order of hundreds of MBs or low GBs.  
**NOTE:** Fewer extra edits may be retained than value specified for this setting if doing so would mean that more segments would be retained than the number configured by `dfs.namenode.max.extra.edits.segments.retained`.

#### Default Value:
1000000

### dfs.namenode.checkpoint.dir

#### Description:
Determines where on the local filesystem the DFS secondary name node should store the temporary images to merge. If this is a comma-delimited list of directories then the image is replicated in all of the directories for redundancy.

#### Default Value:
file://${hadoop.tmp.dir}/dfs/namesecondary

### dfs.namenode.checkpoint.edits.dir

#### Description:
Determines where on the local filesystem the DFS secondary name node should store the temporary edits to merge. If this is a comma-delimited list of directories then the edits is replicated in all of the directories for redundancy. Default value is same as `dfs.namenode.checkpoint.dir`

#### Default Value:
${dfs.namenode.checkpoint.dir}

### dfs.namenode.checkpoint.max-retries

#### Description:
The SecondaryNameNode retries failed check pointing. If the failure occurs while loading fsimage or replaying edits, the number of retries is limited by this variable.

#### Default Value:
3
