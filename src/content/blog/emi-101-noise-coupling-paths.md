---
title: "EMI 101: Where Noise Actually Comes From on a Mixed-Signal PCB"
date: 2026-07-05
summary: "A source-path-victim framework for reasoning about EMI on embedded boards, and why fixing the coupling path is usually cheaper and more effective than shielding the victim after the fact."
tags: ["EMI", "EMC", "PCB Design", "Signal Integrity"]
category: "EMI/EMC"
coverImage: "/images/blog/emi-coupling-paths.svg"
featured: false
draft: false
---

EMI problems feel mysterious right up until you break them into three parts: a **source**, a **path**, and a **victim**. Every EMI issue I've debugged has had all three present, and — this is the useful part — removing any single one of the three makes the problem disappear. That reframes "why is my board noisy" from a vague hunt into a concrete question: which of the three am I looking at, and which is cheapest to fix?

## The source

Sources are almost always fast edges: switching regulator transitions, MCU clock and I/O toggling, motor drive PWM, and digital bus edges. The key physical fact is that emissions scale with how *fast* a signal transitions, not just how large it is — a fast-edged 3.3 V logic signal can produce more high-frequency energy than a slower-edged higher-voltage one. Slowing edges down (within timing budget), using spread-spectrum clocking on the MCU or regulator, and adding snubbers on switch nodes all attack the problem at the source, which is usually the cheapest place to fix it because it's a component or configuration change, not a board respin.

## The path

The path is where the energy gets from the source to somewhere it can radiate or conduct into a victim circuit. Two path types matter:

**Conducted paths** are shared traces, power rails, and — critically — shared ground impedance. If a noisy digital return current and a sensitive analog return current share the same section of ground plane, the digital noise shows up as a voltage disturbance on what the analog circuit thinks is its clean reference. This is why star grounding or at least careful plane partitioning matters for mixed-signal boards, and why analog and digital ground, even when tied together, should meet at one deliberate point rather than merging everywhere.

**Radiated paths** are loop antennas formed, often accidentally, by current flow and its return path. Any loop of current — a switching regulator's power loop, a cable with a poorly bonded shield, a long trace routed far from its ground reference — radiates proportionally to loop area and current. This is the single biggest lever available on a PCB layout: minimize loop area everywhere a fast edge or high current flows, and keep those loops away from anything that has to leave the board (cables, connectors, antennas).

## The victim

Victims are typically RF receivers, ADCs, or other sensitive analog front ends — anything trying to resolve a small signal in the presence of noise. Hardening the victim (filtering at the input, shielding, physical separation, differential signaling for common-mode noise rejection) works, but it's usually the most expensive and least reliable point to intervene, because you're fighting a problem that was created somewhere else on the board and trying to clean it up after the fact.

## Why fixing the path usually wins

In practice, I prioritize fixes in this order: source, then path, then victim. A source fix (slower edges, spread-spectrum, a snubber) is often a component change. A path fix (tighter loops, better plane structure, physical separation) is a layout change, usually doable within a normal design pass if caught early. A victim fix (shielding cans, extra filtering, board-in-board isolation) adds cost and complexity to every unit shipped, forever, to compensate for a problem that a layout decision could have prevented for free.

## A concrete example

On an industrial IIoT power-monitoring design combining active power factor correction with real-time signal analysis, the ADC sampling the current-sense signal was the obvious "victim" — any noise on its reference or input showed up directly as measurement error. Rather than adding aggressive filtering at the ADC (a victim-side fix that would have also slowed down the FFT-based analysis by filtering signal along with noise), the more effective changes were at the source and path: keeping the PFC switching loop tight and physically separated from the sensing circuitry, and giving the analog sensing section its own clean plane region referenced back to the digital ground at a single point. The measurement noise floor dropped without touching the ADC's own filtering at all.

## The takeaway

Next time a board is noisier than expected, resist the urge to reach for a shielding can first. Identify the source, trace the path, and fix the cheapest link in that chain — usually it isn't the victim.
