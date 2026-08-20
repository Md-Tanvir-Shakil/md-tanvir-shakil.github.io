---
title: "(Sample) ESP32-Based Industrial Machine Condition Monitor"
type: engineering
summary: "Example entry — replace with a real project. A battery-powered ESP32 sensor node that streams vibration and temperature data over MQTT for predictive maintenance."
problemStatement: "[ADD — what real problem existed? e.g. unplanned downtime from undetected bearing wear on factory-floor motors.]"
approach: "[ADD — what you designed/built to solve it.]"
hardware:
  - "ESP32-WROOM-32"
  - "MPU6050 IMU (vibration)"
  - "DS18B20 temperature sensor"
  - "Custom 2-layer PCB (KiCad)"
  - "18650 Li-ion cell + charging circuit"
software:
  - "ESP-IDF / FreeRTOS"
  - "MQTT (Mosquitto broker)"
  - "Node-RED dashboard"
algorithms:
  - "FFT-based vibration feature extraction"
  - "Threshold + simple anomaly scoring (placeholder — replace with your actual method)"
architectureNotes: "[ADD — describe the system architecture: sensor node → gateway → broker → dashboard/cloud. Consider adding a diagram to public/images/projects/.]"
results: "[ADD MEASURABLE RESULTS — e.g. battery life achieved, sampling rate, detection latency, false-positive rate. Do not fabricate numbers.]"
myContribution: "[ADD — clearly state what you personally designed: schematic, firmware, PCB layout, dashboard, etc.]"
images: []
coverImage: ""
githubRepo: "https://github.com/Md-Tanvir-Shakil"
demoUrl: ""
documentationUrl: ""
researchRelevance: "Feeds directly into research interests around edge-based anomaly detection and predictive maintenance for smart manufacturing."
technologies: ["ESP32", "FreeRTOS", "MQTT", "KiCad", "I2C", "Edge Sensing"]
categories: ["Embedded Systems", "IoT", "Industrial Automation", "PCB"]
status: "completed"
startDate: "2025-01"
endDate: "2025-04"
tags: ["esp32", "iiot", "predictive-maintenance"]
featured: true
order: 1
draft: false
---

This is example/template content shipped with the portfolio scaffold. Replace every
bracketed placeholder above and this body text with your real project details before
publishing. Use this space for anything that doesn't fit neatly into the structured
fields above — implementation notes, lessons learned, or diagrams (embed with standard
Markdown image syntax once you've added files under `public/images/projects/`).
