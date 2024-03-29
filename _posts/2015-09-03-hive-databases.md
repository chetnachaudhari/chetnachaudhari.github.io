---
title: "Hive Databases - Notes"
tags: 
  - hadoop 
  - hive 
  - hdfs 
  - linux
  - metastore
  - warehouse
categories: 
  - Hadoop 
  - Hive
read_time: false
comments: true
share: true
related: true
---

This article covers some notes and how to's around hive databases.

### Notes:
1) Default database does not have it's directory.It always points to warehouse directory defined using `hive.metastore.warehouse.dir` .

```bash
0: jdbc:hive2://> describe database default;
+----------+------------------------+----------------------------------------------------------+-------------+-------------+-------------+
| db_name  |        comment         |                         location                         | owner_name  | owner_type  | parameters  |
+----------+------------------------+----------------------------------------------------------+-------------+-------------+-------------+
| default  | Default Hive database  | hdfs://sandbox.hortonworks.com:8020/apps/hive/warehouse  | public      | ROLE        |             |
+----------+------------------------+----------------------------------------------------------+-------------+-------------+-------------+
1 row selected (0.302 seconds)
```

2) To check value of any configuration property, you can use `set` command. For eg. to check which directory is configured as warehouse directory, you can do

```bash
0: jdbc:hive2://> set hive.metastore.warehouse.dir;
+----------------------------------------------------+
|                        set                         |
+----------------------------------------------------+
| hive.metastore.warehouse.dir=/apps/hive/warehouse  |
+----------------------------------------------------+
1 row selected (0.011 seconds)
```

3) For every new database, a directory is created inside warehouse directory.

### Example Commands:

1) To create a database without checking if it exists.

```bash
0: jdbc:hive2://> create database newDatabase;
```

2) Create database with check if it already exists.

```bash
0: jdbc:hive2://> create database if not exists newDatabase;
```

3) To list databases :

```bash
0: jdbc:hive2://> show databases;
+----------------+
| database_name  |
+----------------+
| default        |
| fsimage        |
| newdatabase    |
| xademo         |
+----------------+
4 rows selected (0.187 seconds)
```

```bash
0: jdbc:hive2://> show databases like 'new*';
+----------------+
| database_name  |
+----------------+
| newdatabase    |
+----------------+
1 row selected (0.152 seconds)
```

4) To use particular database:

```bash
0: jdbc:hive2://> use newDatabase;
```

5) To see location of database:

```bash
0: jdbc:hive2://> describe database newDatabase;
+--------------+----------+-------------------------------------------------------------------------+-------------+-------------+-------------+
|   db_name    | comment  |                                location                                 | owner_name  | owner_type  | parameters  |
+--------------+----------+-------------------------------------------------------------------------+-------------+-------------+-------------+
| newdatabase  |          | hdfs://sandbox.hortonworks.com:8020/apps/hive/warehouse/newdatabase.db  | anonymous   | USER        |             |
+--------------+----------+-------------------------------------------------------------------------+-------------+-------------+-------------+
1 row selected (0.194 seconds)
```

6) To drop a database:

```bash
0: jdbc:hive2://> drop database newDatabase;
```
