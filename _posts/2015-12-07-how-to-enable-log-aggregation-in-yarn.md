---
layout: post
title: How to enable Log Aggregation in Yarn
tags: hadoop yarn
description: This post explains how ro enable log aggregation in yarn
keywords: hadoop, hdfs, linux, yarn, logs, aggregation,
categories: Hadoop 
---
<div class="toc"></div>

Log-Aggregation is a centralized management of logs in all NodeManager nodes provided by Yarn. It will aggregate and upload finished container or task's log to HDFS.If you are getting a message similar to “Log Aggregation not enabled”, you can follow the below steps to enable it.Add the following configuration to the **yarn-site.xml** of all the yarn hosts and restart node managers.

```xml
<property>
    <description>Whether to enable log aggregation.</description>
    <name>yarn.log-aggregation-enable</name>
    <value>true</value>
</property>

<property>
	 <description>Where to aggregate logs to.</description>
    <name>yarn.nodemanager.remote-app-log-dir</name>
    <value>/tmp/logs</value>
</property>

<property>
    <description>How long to keep aggregation logs before deleting them.</description>
    <name>yarn.log-aggregation.retain-seconds</name>
    <value>259200</value>
</property>

<property>
    <description>How long to wait between aggregated log retention checks. If set to 0 or a negative value then the value is computed as one-tenth of the aggregated log retention time.</description>
    <name>yarn.log-aggregation.retain-check-interval-seconds</name>
    <value>3600</value>
</property>
```    

