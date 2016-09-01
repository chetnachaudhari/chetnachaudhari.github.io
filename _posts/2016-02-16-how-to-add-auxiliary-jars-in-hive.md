---
layout: post
title: How to add auxiliary Jars in Hive
tags: hadoop hive
description: How to add pre-commit hook for JIRA tracking in git commits.
keywords: hive, hdfs, jars, linux, bash
categories: Hadoop Hive
---
<div class="toc"></div>

Many times we need to add auxiliary (3rd party) jars in hive class path to make use of them. Some of the auxiliary jars which I use most of the times like serde , dim lookup or 4mc.

There are different ways to achieve this.

## 1) Hive Server Config (hive-site.xml):

Modify your hive-site.xml config and add following property to it.

```xml
<property>
    <name>hive.aux.jars.path</name>
    <value>comma separated list of jar paths</value>
</property>
```

#### Example:

```xml
<property>
    <name>hive.aux.jars.path</name>
    <value>/usr/share/dimlookup.jar,/usr/share/serde.jar</value>
 </property>
```

You will need to restart hive server, so that these properties take effect.

## 2) Hive-Cli –auxpath option:
You can mention the comma separated list of auxiliary jars path while launching hive shell.

#### Example.

```bash
hive --auxpath  /usr/share/dimlookup.jar,/usr/share/serde.jar
```

## 3) Hive Cli add jar command:
You can add jar using

```bash
add jar jar_path;
```
#### Example:

```bash
add jar /usr/share/serde.jar;
add jar /usr/share/dimlookup.jar;
```

## 4) Add in HIVE_AUX_JARS_PATH environment variable:

```bash
export HIVE_AUX_JARS_PATH=/usr/share/serde.jar
```

## 5) .hiverc:

You can add all your add jars statements to .hiverc file in your home / hive config directory. So that they take effect on hive-cli launch. 