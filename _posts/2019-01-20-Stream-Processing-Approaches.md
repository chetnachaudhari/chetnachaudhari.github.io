---
layout: single
title: "Stream Data Processing Approaches"
tags: Streaming
categories:
	- Data Processing
read_time: false
comments: true
share: true
related: true
---

There are different approaches which stream processing applications take to handle reprocessing of messages. Depending on the requirements of solution an architect / developer can choose between one of the below

### At least once:
- Each message is guaranteed to be processed
- Message may get processed more than once
- This guarantees no data loss, but does result in duplicate records passing through the system.


### At most once:
- Each message may or may not be processed
- If a message is processed, it's only processed once.
- This mostly leads to a missing data issues.


### Exactly once:
- Each message is guaranteed to be processed once and only once
- An example: Credit card transactions processing, in this case if we process a message multiple times it means we're paying multiple times, and if we drop a message means we're not processing a payment.

