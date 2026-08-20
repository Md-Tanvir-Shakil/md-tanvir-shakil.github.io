---
title: "FreeRTOS Task Architecture: Priorities, Queues, and Avoiding Priority Inversion"
date: 2026-05-08
summary: "A practical approach to assigning FreeRTOS task priorities, moving data safely between tasks with queues, and the priority inheritance mechanism that keeps a shared resource from silently stalling your highest-priority task."
tags: ["FreeRTOS", "RTOS", "Firmware", "Embedded Systems"]
category: "Firmware"
coverImage: "/images/blog/freertos-tasks.svg"
relatedProjects: ["esp32-s3-ai-ip-camera"]
featured: false
draft: false
---

FreeRTOS gives you priorities, queues, semaphores, and mutexes, and it will let you misuse every one of them in ways that work fine on the bench and fail unpredictably in the field. Most of the FreeRTOS bugs I've debugged weren't API misuse — they were architecture problems: the wrong task got the wrong priority, or two tasks shared a resource without the coordination the RTOS actually needs to keep them safe.

## Assign priorities from real-time requirements, not gut feel

The instinct is to give the "important" task a high priority. That's not quite the right question. The right question is: **what happens if this task's response is delayed by a few milliseconds?** If the answer is "a sensor sample gets dropped or a control loop deadline is missed," it needs a high priority and needs to be short. If the answer is "a status LED updates a moment later," it can sit at the bottom.

On a sensor-fusion-to-cloud pipeline, I typically structure it something like: the ISR handling DMA-driven sensor capture runs at interrupt priority (as short as possible — capture the data and get out); a sensor-fusion task runs at a high task priority because it has a genuine real-time deadline; a network/MQTT publishing task runs at a middle priority because it's important but can tolerate some jitter; and a UI or idle-adjacent task sits at the lowest priority, because nothing catastrophic happens if it runs a few milliseconds late.

Keep ISRs minimal. An interrupt handler that does real work — parsing a packet, running a filter — holds up every task at or below the priority it implicitly blocks, and it does so in a context where you can't use most of the RTOS's blocking primitives anyway. Capture the data, signal a task (via a queue or a semaphore give), and get out.

## Queues move data safely between tasks

A queue is the right way to hand data from a producer task (or ISR) to a consumer task without either of them touching shared memory directly. The producer pushes; the consumer blocks waiting to receive, sleeping and yielding the CPU rather than busy-polling, which is exactly the behavior you want in an RTOS — a blocked task consumes no CPU cycles, so other tasks below it in priority still get to run.

The mistake I see most often is sizing the queue too small for a burst condition and then not deciding, deliberately, what happens when it fills. Does the producer block (fine if that's an acceptable delay upstream) or drop the newest data (fine if only the latest sample matters) or overwrite the oldest? FreeRTOS gives you the primitives to implement any of these; it doesn't pick one for you, and leaving it as whatever the default behavior happens to be is how "it works in testing" turns into "it drops data under load in the field."

## Priority inversion: the bug that hides until it doesn't

Priority inversion happens when a low-priority task holds a resource (say, a mutex guarding a shared I²C bus) that a high-priority task needs, and a medium-priority task — unrelated to either — keeps preempting the low-priority task before it can finish and release the resource. The high-priority task ends up waiting, effectively, on a medium-priority task it has no direct relationship with. This is exactly as bad as it sounds for anything with real-time requirements, and it's notoriously hard to catch in testing because it depends on a specific, timing-sensitive interleaving of three tasks, not two.

FreeRTOS's mutex implementation includes **priority inheritance**: when a high-priority task blocks on a mutex held by a lower-priority task, the holder is temporarily boosted to the blocked task's priority for as long as it holds the resource. That prevents a medium-priority task from cutting in, because the low-priority holder is now, briefly, not low-priority. This is why I use `xSemaphoreCreateMutex()` rather than a plain binary semaphore for any resource shared between tasks of different priority — a binary semaphore has no concept of ownership and provides no inheritance, so it can't protect you from this failure mode at all.

## A concrete pattern: sharing an I²C bus

On boards where a high-priority sensor-fusion task and a lower-priority housekeeping task both need the I²C bus, I guard the bus with a mutex, keep every critical section (the actual transaction) as short as possible, and make sure no task holds the mutex across anything that could block for an unbounded time (like a network call or a long delay). The mutex with priority inheritance means the housekeeping task can't stall the fusion task indefinitely even in the worst-case interleaving — and because the critical section is short by design, the inheritance boost, when it happens, only lasts a few instructions.

## The pattern, condensed

- Assign priority based on real deadline consequences, not perceived importance.
- Keep ISRs minimal; hand off real work to a task via a queue or semaphore.
- Size queues deliberately and decide explicitly what happens when they're full.
- Use real mutexes (not binary semaphores) for anything shared across priority levels, and keep critical sections short.

None of this is exotic RTOS theory — it's the difference between a task diagram that looks correct on a whiteboard and one that actually behaves correctly under real, bursty, unpredictable timing in the field.
