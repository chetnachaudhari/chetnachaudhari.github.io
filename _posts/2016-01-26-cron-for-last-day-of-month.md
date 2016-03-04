---
layout: post  
title: How to setup cron job for last day of month  
tags: bash  
categories: Linux  
---

You can run any command or script any time or repeatedly with the help of linux utility `cron`. To add a cron, just run command `crontab -e`, this will open a file with crontab entries if any.

The format of a cron line is like below:

```bash
MIN HOUR DOM MON DOW CMD
```

Here,
> **MIN** - Minute field, which can have values between 0 - 59  
> **HOUR** - Hour field, which can have values between 0 - 23  
> **DOM** - Day of the Month field, values 1 - 31  
> **MON** - Month field, values 1 - 12  
> **DOW** - Day of Week field, values 0 - 6  
> **CMD** - Command field, here you can mention the command which you want to schedule.  

For example, if you want to run `/home/chetna/gather_stats.sh` on 27th January at 2.30 pm. Then you can add a cron entry like below:

```bash
30 14 27 01 * /home/chetna/gather_stats.sh
```

So, how do you write a cron to run on last day of month? The problem is, we don’t have a number to put in DOM field, as it could be 28, 30, 31 days in month, sometimes 29.
For eg.

```bash
59 23 28-31 * * /home/chetna/gather_stats.sh
```

This will run the script on 28,29,30 and 31st of every month at 11.59 pm. But in our case, if a month has 31 days, say January, we don’t want to run our script on other 3 days.It should only run on 31 January.
But in all the months, the next day will be 1. So we can use `date`
to check if next day is 1, and if yes, run my script.
This is how I achieved the task:

```bash
59 23 28-32 * * [‘$(date +%d -d tomorrow)’ == ’01’ ] && /home/chetna/gather_stats.sh
```

Here,

```bash
date +%d -d tomorrow
```

will give tomorrows date as two character string. So we can check it, if it matches “01”


