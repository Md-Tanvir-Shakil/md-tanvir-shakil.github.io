---
title: "Portable Thermal DOT Printer with JL MCU AC7911B8"
type: engineering
summary: "Compact, energy-efficient portable thermal DOT printer for receipts, QR codes, and barcodes, built on the JieLi AC7911B8 MCU for retail, logistics, and mobile POS use."
problemStatement: "Retail, logistics, and mobile point-of-sale applications needed a compact, battery-powered thermal printer with reliable wireless connectivity and robust field operation."
approach: "Designed and developed a compact and energy-efficient portable thermal DOT printer based on the JieLi AC7911B8 microcontroller, supporting high-speed thermal printing for receipts, QR codes, and barcodes. Implemented BLE and optional USB/UART interfaces, a 2-inch thermal print head with efficient power management, and Li-ion battery charging/protection for reliable field operation."
hardware:
  - "JL (JieLi) AC7911B8 MCU"
  - "2-inch (58mm) thermal DOT print head"
  - "Li-ion battery + charging/protection circuit"
  - "Custom PCB (Altium)"
software:
  - "ESC/POS command set"
  - "Bluetooth BLE/SPP"
  - "USB/UART communication"
algorithms:
  - "Print buffering, font management, and graphical image rendering"
architectureNotes: "Host device (phone/POS terminal) sends ESC/POS-formatted print jobs over BLE/SPP or USB/UART; onboard firmware buffers, renders, and drives the thermal print head while monitoring paper presence, head temperature, and battery level."
results: "In market. [ADD MEASURABLE RESULTS once available — e.g. print speed, battery life per charge.]"
myContribution: "Designed and developed the system as Hardware & RTOS Architect, including firmware for print buffering, font management, and status monitoring."
images: []
coverImage: ""
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Demonstrates low-power embedded systems and BLE-connected mobile hardware design."
technologies: ["JL AC7911B8", "ESC/POS", "Bluetooth BLE/SPP", "USB/UART", "Li-ion Battery Management", "Embedded C", "PCB Design (Altium)"]
categories: ["Embedded Systems", "PCB", "Firmware"]
status: "completed"
startDate: ""
endDate: ""
tags: ["thermal-printer", "ble", "mpos", "battery-management"]
featured: false
order: 7
draft: false
---

In market. Project images pending upload — see `public/images/projects/`.
