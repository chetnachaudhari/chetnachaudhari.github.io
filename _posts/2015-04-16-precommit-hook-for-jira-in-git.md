---
layout: single
title: "How to add pre-commit hook for JIRA tracking in git commits."
tags: git
description: How to add pre-commit hook for JIRA tracking in git commits.
keywords: git, hook, precommit, linux, bash
categories: Git
---

Having a clean and useful commit messages always makes debugging easier. There are many different patterns people follow to maintain neat git log history. Here is what I like the most, I always like to link a JIRA issue id with commit, so that any point in time, I can check the description of the task, for which the code change was made.

To make it compulsory, so that other committers will also follow the same commit message convension, you can add a pre commit hook in your git repository.

* Steps to add hook:

1. cd into your git repository folder.

2. Since this is commit-msg hook, you'll need to make it executable.
```bash
chmod a+x .git/hooks/commit-msg```
```

3. Now update the commit-msg file with the following content.

```bash
 test "" != "$(grep 'JIRA-' "$1")" || {
       echo >&2 "ERROR: JIRA issue number missing in commit message."
       exit 1;
}
```
Here replace your project name with JIRA.


   Just to validate its working,try to make a commit without the pattern (JIRA-) , You should get the error "ERROR: JIRA issue number missing in commit message."

Enjoy git committing :) :) 