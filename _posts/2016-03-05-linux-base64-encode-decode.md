---
layout: single
title: "Linux command for Base64 encode and decode"
tags: bash
categories: Linux
---


Linux has base64 command to encode and decode using Base64 representation. Here is an example :
To encode a string `Chetna Chaudhari` you can use following command:

```bash
echo "Chetna Chaudhari" | base64
Q2hldG5hIENoYXVkaGFyaQo=
```

You can enable debug mode using `-d` flag to see more details :

```bash
echo "Chetna Chaudhari" | base64 -d
May 16 10:56:35 Chetna.local base64[26454] <Info>: Read 17 bytes.
May 16 10:56:35 Chetna.local base64[26454] <Info>: Wrote 24 bytes.
Q2hldG5hIENoYXVkaGFyaQo=
```

To decode the encoded text,

```bash
echo Q2hldG5hIENoYXVkaGFyaQo= | base64 --decode
Chetna Chaudhari
```

You can check more details using following command:

```bash
echo Q2hldG5hIENoYXVkaGFyaQo= | base64 -d --decode
May 16 10:56:37 Chetna.local base64[26431] <Info>: Read 25 bytes.
May 16 10:56:37 Chetna.local base64[26431] <Info>: Decoded to 17 bytes.
Chetna Chaudhari
May 16 10:56:37 Chetna.local base64[26431] <Info>: Wrote 17 bytes.
```
