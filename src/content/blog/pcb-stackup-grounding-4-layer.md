---
title: "Grounding and Stack-up Strategy for 4-Layer Mixed-Signal Boards"
date: 2026-04-10
summary: "Why a Signal-Ground-Power-Signal 4-layer stack-up is the default I reach for on mixed-signal embedded boards, and how it simplifies both signal integrity and EMC at the same time."
tags: ["PCB Design", "Grounding", "Signal Integrity", "EMC"]
category: "PCB Design"
coverImage: "/images/blog/pcb-stackup.svg"
featured: false
draft: false
---

Stack-up decisions get made early in a project, usually before most of the schematic exists, and they're expensive to change later because the whole layout depends on them. For a 4-layer mixed-signal embedded board — the kind with an MCU, some analog sensing, a power section, and often an RF radio — I default to a Signal-Ground-Power-Signal arrangement unless there's a specific reason not to, and it's worth being explicit about why.

## Every signal layer needs an adjacent solid plane

The core idea is simple: any trace carrying a fast-edged or high-frequency signal needs a low-impedance return path directly beneath it, and the cheapest way to guarantee that is a solid, unbroken plane on the immediately adjacent layer. In a Signal-Ground-Power-Signal stack, the top signal layer (L1) sits directly above the ground plane (L2), and the bottom signal layer (L4) sits directly below the power plane (L3) — every signal layer has a plane neighbor, and every trace's return current has a short, predictable path directly underneath it rather than having to find its way back through whatever copper happens to be available.

This matters for two things that are often treated as separate disciplines but are really the same physics: **signal integrity** (a well-defined return path keeps trace impedance controlled and predictable, which matters for high-speed digital and RF) and **radiated EMI** (a tight loop between a signal and its return path is a small antenna; a poorly defined return path forces current to take a longer, larger-area route back to its source, and that larger loop radiates more).

## Why ground goes on layer 2, not layer 3

Putting the ground plane immediately under the top signal layer, rather than the power plane, is a deliberate choice. The top layer is typically where the fastest, most sensitive routing happens — MCU-to-peripheral high-speed lines, RF feed lines, crystal traces — and those are exactly the signals that benefit most from a low-inductance ground reference immediately beneath them. The power plane, one layer further down, still serves the bottom layer well and provides a broad, low-impedance power distribution plane, but it's less critical that it sit directly under the fastest signals.

## Keep the ground plane solid — really solid

A ground plane with slots routed through it to get a trace from one side of the board to the other defeats much of the purpose of having a plane at all. Every slot forces return current to detour around it, lengthening the return path and increasing loop area exactly where you were trying to prevent that. On every layout I do, the ground plane on L2 is treated as sacred: if a trace absolutely has to cross where a slot would otherwise go, I route it on a different layer instead of compromising the plane.

## Splitting the power plane by rail

Unlike the ground plane, the power plane commonly gets split into separate pours for each voltage rail — 3.3 V, 5 V, whatever else the board needs — since a single plane can only carry one voltage. Each split pour still wants to be as large and unbroken as practical, and the split boundaries should be routed away from areas where a signal layer above or below needs a clean return path, since a signal crossing a plane split effectively loses its adjacent-plane reference at that point too.

## Analog and digital ground: one plane, one deliberate connection point

On a mixed-signal board, I generally still use a single physical ground plane rather than physically separate analog and digital ground pours, but I'm deliberate about where digital return currents and analog return currents converge — routing the layout so that noisy digital return paths don't cross directly underneath sensitive analog circuitry, and letting the two "regions" of the single plane meet naturally at one point close to where analog and digital sections interface (near an ADC, for example) rather than merging freely everywhere. Full plane splits for analog/digital ground are sometimes warranted on more sensitive designs, but they introduce their own risk — any signal that has to cross the split loses its return-path reference right at the crossing — so I only reach for that on boards where the sensitivity genuinely demands it.

## The layout consequence

Once the stack-up is fixed, the routing discipline follows from it directly: route critical high-speed and RF signals on L1 where the adjacent ground plane is guaranteed, avoid layer changes for those signals that would force a return-path reference change, and treat any necessary layer transition as a place to add a stitching via near the signal via so the return current has a short path between planes too.

None of this is unique to any one project — it's the same reasoning I apply to every mixed-signal board, because the physics doesn't change: give every signal a plane to reference, keep that plane solid, and the rest of the design — signal integrity and EMC both — gets meaningfully easier.
