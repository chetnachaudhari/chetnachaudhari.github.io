---
title: "HDFS - Quota Management"
tags: 
    - hadoop 
    - hdfs
categories: 
    - Hadoop
read_time: false
comments: true
share: true
related: true
---

This post explains how to set space and named quotas in hdfs, hadoop

## HDFS Quotas:

You can set two types of quotas in HDFS

**a. Space Quota:** The amount of space used by given directory

**b. Name Quota:** The number of file and directory names used.

#### Notes:

* Quotas for space and names are independent of each other
* File and directory creation fails if creation would cause the quota to be exceeded.
* Block allocations fail if the quota would not allow a full block to be written.
* Each replica counts against quota. For eg. if user is writing 3GB file with replication factor of 3, then 9GB will be consumed from his quota.
* Largest quota is Long.Max_Value


## HDFS Quota Operations:


### a. Set a Name quota:

**_ACL:_** Only admin can perform this operation.

**_Command:_** Hadoop admin can use following command to set name quota.

```bash
hadoop dfsadmin -setQuota number_of_files path
```
eg.

 ```bash
hadoop dfsadmin -setQuota 100 /grid/landing
```

**_Explanation:_** It sets hadoop quota to 100, which means user can create 100 files including directories under /grid/landing path.


### b. Clear a Name quota:

**_ACL:_** Only admin can perform this operation.

**_Command:_** Hadoop admin can use following command to clear name quota.

```bash
hadoop dfsadmin -clearQuota path
```
eg. 
```bash
hadoop dfsadmin -clearQuota /grid/landing 
```


### c. Set Space quota:

**_ACL:_** Only admin can perform this operation.

**_Command:_** To set space quota, hadoop admin can use following command,

```bash
hadoop dfsadmin -setSpaceQuota size path
```
eg. 
```bash
hadoop dfsadmin -setSpaceQuota 15G /grid/landing
```

**_Explanation:_** It means user can write upto 5GB ( 5 * 3 = 15) of data under /grid/landing path , assuming the replication factor of 3. Here user cannot write data less than block size. why? Because HDFS assumes an entire block will be filled, when its allocated. eg. say, if some path /projects/ingestion has quota of 50 MB, and if someone is writing a file of 10MB under this path, it'll fail, because of quota violation. Here HDFS thinks user is writing 384MB (128 * 3) data, instead of (10 * 3 = 30 MB).


### d. Clear Space quota:

**_ACL:_** Only admin can perform this operation.

**_Command:_** To clear space quota, admin can use following command,

```bash
hadoop dfsadmin -clearSpaceQuota path
```
eg. 
```bash
hadoop dfsadmin -clearSpaceQuota /grid/landing
```

### e. Get quota allocation of Path:

**_ACL:_** Anyone can check quota allocation of path

**_Command:_** Hadoop admin can use following command to check quota allocation of a path,

```bash
hadoop fs -count -q path
```
eg. 
```bash
hadoop fs -count -q /grid
```

**_Explanation:_** Above command will give output of following format,

```bash
hadoop fs -count -q /grid
9223372036854775807 9223372036854775333 none  inf  141  333 655855032 /grid
```
where ,

> **column1** --> Namespace quota, which means total 9223372036854775807 files can be created  
> **column2** --> Available Namespace quota, user can add 9223372036854775333 files .  
> **column3** --> Space quota  
> **column4** --> Available space quota  
> **column5** --> Number of directories  
> **column6** --> Number of Files  
> **column7** --> Size of content available  
> **column8** --> Path  