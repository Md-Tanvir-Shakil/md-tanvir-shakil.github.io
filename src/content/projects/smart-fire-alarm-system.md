---
title: "IoT-Based Smart Fire Alarm System — Edge AI Real-Time Detection & Alert Platform"
type: engineering
summary: "Wi-Fi and GSM-enabled edge AI fire detection and alerting system that fuses temperature, flame, and smoke sensors to reduce false alarms and deliver instant alerts."
problemStatement: "Conventional fire alarm systems are prone to false positives and lack real-time remote alerting, delaying emergency response."
approach: "Designed and developed a Wi-Fi and GSM-enabled edge AI-based fire detection and alerting system for real-time monitoring and emergency response. Integrated temperature, flame, and smoke sensors with embedded intelligence to reduce false alarms through sensor fusion and anomaly detection algorithms, with instant SMS alerts via GSM and mobile app notifications through cloud connectivity."
hardware:
  - "ESP32"
  - "Temperature sensor"
  - "Flame sensor"
  - "Smoke sensor"
  - "GSM module"
  - "Custom PCB (Altium)"
software:
  - "Wi-Fi + GSM connectivity (AT commands)"
  - "MQTT"
  - "Cloud-connected mobile app notifications"
algorithms:
  - "Sensor fusion across temperature/flame/smoke"
  - "Anomaly detection to reduce false alarms"
architectureNotes: "Sensor node fuses temperature, flame, and smoke readings on-device to apply anomaly-detection logic before triggering alerts, then dispatches SMS via GSM and push notifications via cloud/MQTT to a mobile app."
results: "In market. [ADD QUANTITATIVE RESULTS — e.g. false-alarm reduction rate, alert latency — once available.]"
myContribution: "Led full-cycle development as Hardware & System Architect: hardware architecture, PCB design, firmware development, AI deployment, and field testing."
images: []
coverImage: ""
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Evidence for research interests in embedded anomaly detection and sensor fusion for safety-critical edge systems."
technologies: ["ESP32", "Wi-Fi", "GSM", "MQTT", "Sensor Fusion", "PCB Design (Altium)", "Low-Power Design", "Cloud Integration", "AT Command Communication"]
categories: ["IoT", "Edge AI", "Embedded Systems", "PCB"]
status: "completed"
startDate: ""
endDate: ""
tags: ["esp32", "fire-detection", "gsm", "sensor-fusion", "anomaly-detection"]
featured: true
order: 3
draft: false
---

In market. Project images pending upload — see `public/images/projects/`.
