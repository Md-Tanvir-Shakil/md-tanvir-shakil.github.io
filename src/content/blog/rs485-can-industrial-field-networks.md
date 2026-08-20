---
title: "RS-485 and CAN: Building Reliable Industrial Field Networks"
date: 2026-05-22
summary: "Why RS-485 and CAN still beat wireless for hard-wired industrial sensor networks, and the termination, topology, and grounding details that separate a bus that works on the bench from one that survives the field."
tags: ["RS-485", "CAN Bus", "Industrial", "IIoT", "Embedded Systems"]
category: "Embedded Systems"
coverImage: "/images/blog/rs485-can-topology.svg"
relatedProjects: ["rs485-lora-water-level-monitoring", "car-gps-can-bus-data-logger"]
featured: false
draft: false
---

Wireless gets the attention, but a huge amount of real industrial and automotive sensing still runs over wired differential buses, for good reason: they're deterministic, immune to the interference and range problems that plague RF in an industrial environment, and they've been hardened by decades of deployment. RS-485 and CAN are the two I reach for most, and they solve slightly different problems.

## Why differential signaling in the first place

Both buses transmit as a voltage difference between two wires rather than a single-ended voltage referenced to ground. This matters enormously in an industrial environment: common-mode noise — picked up equally by both wires from motor drives, switching power supplies, or ground potential differences across a large facility — cancels out at the receiver, because the receiver only cares about the *difference* between the wires, not their absolute voltage. A single-ended signal (like plain UART) has no such immunity and simply doesn't survive long cable runs in a noisy plant.

## RS-485: simple, cheap, software-defined addressing

RS-485 is a physical layer, not a protocol — it defines how bits get onto the wire, and the addressing, framing, and polling logic live entirely in whatever protocol you run on top, most commonly Modbus RTU in industrial contexts. That simplicity is the appeal: any MCU with a UART and a cheap transceiver IC can join an RS-485 bus, and a single master polling multiple slave devices by address is easy to reason about and debug with nothing more than a logic analyzer.

I used RS-485 alongside LoRa on a water-level monitoring system specifically because the RS-485 segment needed to reliably cover a fixed industrial site with multiple sensor nodes on one wired trunk, while LoRa handled the longer, more distributed hop back to a gateway — different physical constraints, different bus chosen for each.

## CAN: arbitration and error handling built into the silicon

CAN solves a different problem: what happens when more than one node needs to be able to initiate communication, not just respond to a poll. CAN controllers arbitrate bus access in hardware — every node can attempt to transmit, and if two transmit simultaneously, the node sending the lower (higher-priority) identifier wins without either node needing to back off and retry blindly, the way contention-based protocols elsewhere often do. CAN controllers also handle error detection and frame retransmission in silicon, which is a large part of why it became the standard for automotive ECU networks where dozens of controllers share a bus and reliability requirements are strict.

On a vehicle GPS and CAN bus data logger, this is exactly the property being exploited: multiple ECUs are already transmitting on the vehicle's CAN bus independently, and the logger just needs to listen (or in some designs, participate) without disrupting the arbitration that's already keeping the rest of the vehicle's electronics working correctly.

## Termination: the detail everyone gets wrong at least once

Both buses need termination resistors — typically 120 Ω, matching the characteristic impedance of the twisted-pair cable — but critically, **only at the two physical ends of the bus**, not at every node. Terminating every node (or forgetting to terminate either end) causes signal reflections that corrupt data at higher baud rates or longer cable runs, and it's a mistake that often doesn't show up on a short bench setup with two nodes a meter apart — it shows up in the field, on a longer real cable run, intermittently, which makes it maddening to diagnose after the fact. I terminate at design time based on the physical topology, not after debugging a flaky deployment.

## Topology discipline

Both buses are meant to be wired as a single trunk line with nodes tapped along it (multidrop), not as a star. Star topology, or long stub branches off the main trunk, reintroduces the reflection problems termination is trying to solve, because a stub is effectively an unterminated branch. Keep stub lengths short — well under a meter is a reasonable rule of thumb at typical industrial baud rates — and if a star topology is unavoidable due to physical plant layout, that's a signal to reconsider the network architecture (a repeater or a switch to a different topology-tolerant protocol) rather than fight the physics.

## When to pick which

RS-485 with Modbus RTU is my default for simple sensor/actuator networks with one clear master and a handful of slave devices reporting periodically — cheap, well-understood, easy to add a new node to. CAN is the right call when multiple intelligent nodes need to coexist on the same bus with guaranteed low-latency arbitration and built-in error handling — vehicle networks, multi-controller machine automation, anywhere you can't have one slow node blocking the whole bus.

Both buses are decades-old technology by now, and that's exactly the point: the problems have been found and solved already. Respect the termination and topology rules and they will simply work, for years, in environments that would eat a wireless link alive.
