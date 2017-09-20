---
layout: post  
title: How to install protoc 2.5.0 on MacOS 
tags: bash MacOS
description:  How to install protoc 2.5.0 on MacOS
keywords: MacOS
categories: Linux, MacOS, Protoc  
---
<div class="toc"></div>

Recently I faced this issue, while building hadoop on my MacOS machine. 
Hadoop trunk 3.0 Snapshot build fails if compiled with a protoc newer than 2.5. While building I got the following error:

```bash
[ERROR] Failed to execute goal org.apache.hadoop:hadoop-maven-plugins:3.1.0-SNAPSHOT:protoc (compile-protoc) on project hadoop-common: org.apache.maven.plugin.MojoExecutionException: protoc version is 'libprotoc 3.4.0', expected version is '2.5.0' -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
```

To fix this, install protoc 2.5.0 on your mac.

###Steps:

1. Building from source
Download latest version of protocol buffer [https://github.com/google/protobuf/releases/download].

```bash 
wget https://github.com/google/protobuf/releases/download/v2.5.0/protobuf-2.5.0.tar.bz2
```

2. Untar the tar.bz2 file
```bash
tar xfvj protobuf-2.5.0.tar.bz2
```

3. Configure the protobuf.
 
 ```bash cd protobuf-2.5.0
 ./configure CC=clang CXX=clang++ CXXFLAGS='-std=c++11 -stdlib=libc++ -O3 -g' LDFLAGS='-stdlib=libc++' LIBS="-lc++ -lc++abi"
 ```

4. You can use the --prefix parameter to install to a location other than the default "/usr/local/bin"
Make the source

```bash
make -j 4
sudo make install 
```
You'll need to unlink old installed version.


