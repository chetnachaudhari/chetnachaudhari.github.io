---
title: "Compressing Hive Data"
tags: 
  - hadoop 
  - hive 
  - hdfs 
  - linux 
  - metastore 
  - warehouse 
  - data compression 
  - codec 
  - lz4
  - bzip2
  - gzip
  - fourmc
  - snappy
categories: 
  - Hadoop 
  - Hive
read_time: false
comments: true
share: true
related: true
---

To reduce the amount of disk space hive query uses, you should enable hive compression codecs. There are two places where you can enable compression in hive one is during intermediate processing  and other is while writing the output of hive query to hdfs location. There are different compression codecs which you can use with hive for e.g. bzip2, 4mc, snappy, lzo, lz4 and gzip.Each one has their own drawbacks and advantages. Following are the codecs

   + gzip org.apache.hadoop.io.compress.GzipCodec
   + bzip2 org.apache.hadoop.io.compress.BZip2Codec
   + lzo com.hadoop.compression.lzo.LzopCodec
   + lz4 org.apache.hadoop.io.compress.Lz4Codec
   + Snappy org.apache.hadoop.io.compress.SnappyCodec
   + 4mc com.hadoop.compression.fourmc.FourMcCodec

By default DEFLATE codec is set in most of hadoop configurations.

## How to enable Intermediate Compression:

The contents of the intermediate files between jobs can be compressed with the following property in the **hive-site.xml** file.

```xml
<property>
	<name>hive.exec.compress.intermediate</name>
	<value>true</value>
</property>
```
The compression codec can be specified in either the `mapred-site.xml`, `hive-site.xml`, or for the hive session.

```xml
<property>
	<name>mapred.map.output.compression.codec</name>
	<value>com.hadoop.compression.fourmc.FourMCHighCodec</value>
</property>
```

This compression will only save disk space for intermediate files in case of multiple map reduce operations.

## How to enable Hive Output Compression:

When the `hive.exec.compress.output` property is set to true, Hive will use the codec configured by the `mapred.map.output.compression.codec` property to compress the storage in HDFS.

```xml
<property>
   <name>hive.exec.compress.output</name>
   <value>true</value>
</property>
```

The 4mc compression can be compressed into separatable blocks so it can still be used as input efficiently for subsequent map reduce jobs.

```xml
<property>
   <name>mapred.output.compression.codec</name>
   <value>com.hadoop.compression.fourmc.FourMCHighCodec</value>
</property>
```

Users can always enable or disable this in the hive session for each query.  If it is enabled there will be an extra step to extract data from HDFS. These properties can be set in the `hive.site.xml` or in the Hive session via the Hive command line interface.

```bash
hive>set hive.exec.compress.output=true;
hive>set mapred.output.compression.codec= com.hadoop.compression.fourmc.FourMCHighCodec;
```

Here are more details around listing files before and after enabling 4mc compression.

```bash
chetna.chaudhari@fdphadoop-cc-gw-0001:~$hadoop fs -ls /user/hive/warehouse/raw
Found 2 items
-rw-r--r-- 3 chetna.chaudhari hdfs 267628173 2015-09-29 20:48 /user/hive/warehouse/raw/000000_0
-rw-r--r-- 3 chetna.chaudhari hdfs 38765577 2015-09-29 20:48 /user/hive/warehouse/raw/000001_0
```

After creating a table called fourmc, there will be files in hdfs that have the .4mc extension.  Hive queries will be able to decode the compressed data and this will be transparent to the user that is running queries.

```bash
chetna.chaudhari@fdphadoop-cc-gw-0001:~$hadoop fs -ls /user/hive/warehouse/fourmc
Found 2 items
-rw-r--r-- 3 chetna.chaudhari hdfs 26178373 2015-09-29 21:05 /user/hive/warehouse/fourmc/000000_0.4mc
-rw-r--r-- 3 chetna.chaudhari hdfs 3563411 2015-09-29 21:05 /user/hive/warehouse/fourmc/000001_0.4mc
```

The conclusion is that, if you enable fourmc compression with hive, you can reduce the overall processing time of your query along with less disk consumption.