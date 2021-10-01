---
layout: single
title: "Hive Tables - Notes"
tags: hadoop hive
description: This post explains details about hive tables.
keywords: hadoop, hive, hdfs, linux, metastore, warehouse, tables
categories: Hadoop Hive
---

## Notes:

### Types Of Tables:

#### Internal Table:
+ For every internal table a directory is created under warehouse directory.
+ It is tightly coupled with data, means whenever you drop a table, the data will be removed from underlying location.
+ These are also called as managed or temporary table.

#### External Table:
+ These are preferred, when you already have data on HDFS.
+ Only metadata wil lbe removed on drop table, and not underlying data.

### Example Commands:
1) To create an internal table:

```
0: jdbc:hive2://> create table managedTable(id int, name string) row format delimited fields terminated by '\t';
```
2) To load data from file on hdfs:

```
0: jdbc:hive2://> load data inpath '/user/root/managedTable.txt' into table managedTable;
```
3) To load data from local file:

```
0: jdbc:hive2://> load data local inpath '/root/managedTable.txt' overwrite into table managedTable;
```

4) To create an external table:

```
0: jdbc:hive2://> create external table externalTable(id int, name string) row format delimited fields terminated by '\t' location '/user/root/externalTable';
```

5) To get list of tables in a database:

```
0: jdbc:hive2://> show tables;
+----------------+
|    tab_name    |
+----------------+
| externaltable  |
| managedtable   |
+----------------+
2 rows selected (0.214 seconds)
```

```
0: jdbc:hive2://> show tables '*exter*';;
+----------------+
|    tab_name    |
+----------------+
| externaltable  |
+----------------+
1 row selected (0.179 seconds)
```

6) To see full list of tables in hive :

```
0: jdbc:hive2://> !table
+------------+--------------+----------------------+-------------+----------+
| TABLE_CAT  | TABLE_SCHEM  |      TABLE_NAME      | TABLE_TYPE  | REMARKS  |
+------------+--------------+----------------------+-------------+----------+
|            | default      | sample_07            | TABLE       | NULL     |
|            | default      | sample_08            | TABLE       | NULL     |
|            | default      | inode                | TABLE       | NULL     |
|            | demo         | externaltable        | TABLE       | NULL     |
|            | demo         | managedtable         | TABLE       | NULL     |
|            | xademo       | call_detail_records  | TABLE       | NULL     |
|            | xademo       | recharge_details     | TABLE       | NULL     |
|            | xademo       | customer_details     | TABLE       | NULL     |
+------------+--------------+----------------------+-------------+----------+
```

7) To select values from a table:

```
0: jdbc:hive2://>  select * from externalTable;
+-------------------+---------------------+
| externaltable.id  | externaltable.name  |
+-------------------+---------------------+
| 1                 | Chetna              |
| 2                 | Bhavesh             |
| 3                 | Ayush               |
| 4                 | Arya                |
| 5                 | Chaitali            |
| 6                 | Riyanshu            |
+-------------------+---------------------+
6 rows selected (0.582 seconds)
```

8) To check the schema of a table:

```
0: jdbc:hive2://> describe managedTable;
+-----------+------------+----------+
| col_name  | data_type  | comment  |
+-----------+------------+----------+
| id        | int        |          |
| name      | string     |          |
+-----------+------------+----------+
2 rows selected (0.23 seconds)
0: jdbc:hive2://> describe externalTable;
+-----------+------------+----------+
| col_name  | data_type  | comment  |
+-----------+------------+----------+
| id        | int        |          |
| name      | string     |          |
+-----------+------------+----------+
2 rows selected (0.233 seconds)
```

For more details on retention, createTime, modes, location etc:

```
0: jdbc:hive2://> describe formatted externalTable;
```

9) To drop a table:

```
0: jdbc:hive2://> drop table externalTable;
No rows affected (0.239 seconds)
0: jdbc:hive2://> drop table internalTable;
No rows affected (0.147 seconds)
```
