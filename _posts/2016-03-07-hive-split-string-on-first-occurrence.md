---
layout: post
title: How to split a string on first occurrence of character in Hive.
tags: hadoop hive
categories: Hadoop Hive
---
<div class="toc"></div>

In this article we will see how to split a string in hive on first occurrence of a character. Lets say, you have strings like apl_finance_reporting or org_namespace . Where you want to split by org (i.e string before first occurrence of '\_') or namespace (string after '\_').

```bash
hive> create table testSplit(namespace string);
hive> insert into table testSplit values ("scp_apl_finance");
hive> insert into table testSplit values ("apl_finance_reporting");
hive> select namespace from testSplit;
OK
scp_apl_finance
apl_finance_reporting
Time taken: 0.118 seconds, Fetched: 2 row(s)
hive> select regexp_extract(namespace, '^(.*?)(?:_)(.*)$', 0)  from testSplit;
OK
scp_apl_finance
apl_finance_reporting
Time taken: 0.064 seconds, Fetched: 2 row(s)
```

To get list of all orgs we can execute following query:

```bash
hive> select regexp_extract(namespace, '^(.*?)(?:_)(.*)$', 1)  from testSplit;
OK
scp
apl
Time taken: 0.056 seconds, Fetched: 2 row(s)
```

And to get list of all namespaces, use following one:

```bash
hive> select regexp_extract(namespace, '^(.*?)(?:_)(.*)$', 2)  from testSplit;
OK
apl_finance
finance_reporting
Time taken: 0.066 seconds, Fetched: 2 row(s)
```
