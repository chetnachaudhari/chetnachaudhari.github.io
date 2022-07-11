---
layout: single  
title: "CAP Theorem"
tags: Data-Processing
description:  CAP Theorem and solutions
keywords: Designing,Architecture
categories: Architecture 

---

# CAP Theorem

CAP is an acronym that stands for Consistency, Availability and Partition Tolerance. According to CAP theorem, any distributed system can only guarantee two of the three properties at any point of time. You can't guarantee all three properties at once.

### Consistency
- Consistency is where all nodes in our distributed system see the same data at the same time.
- A read is guaranteed to return the most recent write for a given client.
- This is achieved by updating multiple nodes before any reads are allowed.
- When data is written to a single node, it is then replicated across the other nodes in the system.

### Availability

- Availability means that every request gets a proper response, even if nodes have failed.
- A non-failing node will return a reasonable response within a reasonable amount of time (no error or timeout).
- Every request will get a response regardless of the individual state of the nodes.
- This is accomplished by replicating data across servers.

### Partition Tolerance
- The system will continue to function when network partitions occur.
- In CAP theorem, a "partition" is a break in communication between two nodes.
- If a partition occurs between two a pair of nodes, say, in master-master replication, then there are two options:

	- Mark these nodes as being down, meaning that they are no longer available
	- Allow the nodes to become out of sync, which means that we have given up consistency


## Solutions

### Consistency and Availability (CA)

- This one is problematic.
- Many claim that systems that are both consistent and available are not possible.
Their reasoning lies in the idea that you do not choose to have partition tolerance, it is something that naturally arises.
- For example, you could have a database that is not sharded, but has an entire copy of that database to retain availability.
- When a write comes in, you either choose to accept the write, knowing that the master and the replication will be out of sync, or you choose to refuse the write.
In the former case, you've chosen availability, and in the latter, you've chosen consistency.
- relational databases such as PostgreSQL use this principle.

### Consistency/Partition Tolerance (CP)

- This method ensures that the data is consistent between all nodes and becomes unavailable in the case of a partition.
- HBase, MongoDB and BigTable use this principle.

### Availability/Partition Tolerance (AP)

- This method ensures that all of the nodes remain available (through replication), and, in the case of a partition, will resync data between the partitioned nodes once the partition has been resolved. However, this means that the data between nodes might not be consistent.
- Cassandra and CouchDB use this principle.