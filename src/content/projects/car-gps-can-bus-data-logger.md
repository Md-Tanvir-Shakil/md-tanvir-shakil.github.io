---
title: "Car GPS Tracker & CAN Bus Data Logger — Automotive IoT Embedded System"
type: engineering
summary: "ESP32-based automotive GPS tracking and CAN bus data logger, reading engine diagnostics over OBD-II/CAN and relaying live telemetry, geofence, and fault alerts over GSM/GPRS."
problemStatement: "Fleet operators needed real-time vehicle telemetry — location, engine diagnostics, and fault codes — with offline resilience and remote alerting, on hardware that could run safely off a 12V automotive supply."
approach: "Designed and developed an automotive GPS tracking and CAN bus data logging system based on ESP32 microcontroller architecture. The system interfaces with vehicle OBD-II/CAN networks via a CAN controller to acquire real-time engine diagnostics, speed, RPM, and fault codes, integrates a GNSS module for high-accuracy positioning, and uses GSM/GPRS for live telemetry transmission with SMS alerts for geofence violations and engine faults."
hardware:
  - "ESP32"
  - "MCP2515 SPI-CAN controller"
  - "SIMCOM GNSS module"
  - "GSM/GPRS module"
  - "External Flash/SD storage"
  - "Automotive-grade power supply (reverse-polarity + surge protection)"
software:
  - "FreeRTOS"
  - "CAN bus (ISO 11898 / OBD-II)"
  - "GSM/GPRS AT commands"
  - "OTA parameter updates"
algorithms:
  - "Geofencing"
  - "Interrupt-driven tamper/ignition detection with low-power standby wakeup"
architectureNotes: "ESP32 node reads engine diagnostics over CAN via an MCP2515 controller, tags data with GNSS position, and logs to external Flash/SD for offline resilience; live telemetry and alerts (geofence, fault codes) are pushed over GSM/GPRS, with interrupt-driven wakeup keeping standby power low."
results: "[ADD MEASURABLE RESULTS once available — e.g. fleet deployment size, standby battery life, telemetry latency.]"
myContribution: "Designed and developed the full system as Embedded Systems Engineer: CAN/GNSS/GSM integration, automotive power-supply design, and firmware architecture."
images: []
coverImage: ""
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Evidence of embedded systems work in the e-mobility / automotive domain, directly relevant to current research focus on e-mobility and intelligent power electronics."
technologies: ["ESP32", "FreeRTOS", "CAN Bus", "MCP2515", "GNSS", "GSM/GPRS", "PCB Design (Altium)", "Embedded C"]
categories: ["IoT", "Embedded Systems", "PCB"]
status: "completed"
startDate: ""
endDate: ""
tags: ["esp32", "can-bus", "gps", "automotive", "fleet-tracking"]
featured: true
order: 9
draft: false
---

Completed. Project images pending upload — see `public/images/projects/`.
