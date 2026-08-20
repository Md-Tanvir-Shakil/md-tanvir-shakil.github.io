---
title: "Designing a Safe Battery Management System for Li-ion Packs"
date: 2026-06-05
summary: "How a Li-ion BMS actually enforces safety — per-cell voltage sensing, balancing, and hardware-level protection — and why the protection layer should never depend on firmware being correct."
tags: ["BMS", "Li-ion", "Battery", "Power Electronics", "E-Mobility"]
category: "Power Electronics"
coverImage: "/images/blog/bms-block-diagram.svg"
relatedResearch: ["embedded-systems-e-mobility-power-electronics"]
featured: false
draft: false
---

A Li-ion battery pack is not a passive component you can treat like a bigger version of a AA battery. Cells can be driven into thermal runaway by overcharging, over-discharging, or excessive current, and a multi-cell series pack adds a second failure mode on top of that: cell imbalance, where small manufacturing and aging differences cause individual cells to drift apart in state of charge until one cell is pushed outside its safe operating window while the pack as a whole still looks fine at the terminals. A battery management system exists to prevent both categories of failure, and its architecture reflects that split.

## Per-cell sensing is non-negotiable

You cannot manage what you don't measure per cell. A BMS analog front end (AFE) monitors each cell's voltage individually — not just the pack terminal voltage — because a healthy-looking pack voltage can hide one badly out-of-range cell in the middle of the stack. On a 4S pack, that's four independent voltage measurements, each referenced correctly against the AFE's ground scheme (which itself is a design detail worth getting right, since these measurements sit at different absolute voltages relative to pack ground).

Temperature sensing (typically an NTC thermistor per cell or per cell group) rounds out the sensing picture — Li-ion charge and discharge safe limits are temperature-dependent, and thermal runaway detection ultimately depends on catching a temperature rise before it cascades.

## Balancing keeps the pack usable over its lifetime

Even cells from the same manufacturing batch age slightly differently. Without balancing, the weakest cell in a series stack becomes the limiting factor for both charge capacity and safety margin — the pack has to stop charging when the *highest* cell hits its ceiling and stop discharging when the *lowest* cell hits its floor, so imbalance directly reduces usable capacity over time.

Passive balancing (bleeding excess charge from the highest cells through a resistor during charge) is simple and common in cost-sensitive designs. Active balancing (moving charge between cells rather than dissipating it) is more efficient and increasingly available in integrated AFE parts, at higher BOM cost. The right choice depends on cycle life requirements and how much capacity loss from imbalance the application can tolerate.

## Protection has to live below the firmware, not inside it

This is the design principle I treat as absolute: **the hardware protection layer must not depend on firmware executing correctly.** A host MCU can hang, get stuck in a fault state, or simply be mid-update when a fault condition occurs. If overvoltage, undervoltage, or overcurrent cutoff is implemented only in firmware — reading a voltage, deciding it's out of range, and then commanding a FET open — a firmware fault at the wrong moment removes your only protection.

The correct architecture puts overvoltage, undervoltage, and overcurrent/short-circuit cutoff directly in the AFE/protection IC, which drives the charge and discharge FETs independently of any host processor. The host MCU layer — state-of-charge estimation via coulomb counting, state-of-health tracking, fault logging, telemetry to a cloud or gateway — adds intelligence and visibility on top, but it is never the last line of defense. If the host MCU disappears entirely, the pack still has to protect itself.

## Charge and discharge FET topology

Separating the charge FET and discharge FET (rather than using a single FET for both directions) lets the AFE independently disable charging or discharging depending on which fault occurred — for example, blocking further charge on an overvoltage fault while still permitting discharge to power the load, or blocking discharge on an overcurrent fault while still permitting a controlled trickle charge. This granularity matters in real fault scenarios far more than it seems like it should on paper.

## Where this connects to e-mobility work

Battery pack safety architecture is one of the areas I want to go deeper on in graduate research — specifically extending this reasoning to the higher-voltage, higher-current packs used in e-mobility, where thermal and fault-propagation dynamics between cells and modules become more complex and the cost of getting it wrong scales accordingly. The core principle doesn't change with pack size: sense every cell, balance for lifetime, and never let the protection layer depend on software behaving.

## A minimal checklist

- Per-cell voltage and temperature sensing, not just pack-level.
- Balancing strategy chosen deliberately (passive vs. active) based on cycle life and capacity requirements.
- Hardware-enforced overvoltage/undervoltage/overcurrent cutoff in the AFE, independent of host firmware.
- Separate charge/discharge FET control for fault-specific response.
- Host MCU layer adds SOC/SOH estimation and telemetry — treated as an enhancement, never as the safety mechanism.

Getting the sensing and balancing wrong costs you capacity and cycle life. Getting the protection architecture wrong costs you a lot more than that.
