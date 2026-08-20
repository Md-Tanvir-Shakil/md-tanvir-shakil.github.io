---
title: "Embedded AI & TinyML for Edge Intelligence"
summary: "Running machine learning inference directly on resource-constrained microcontrollers to enable real-time, low-power decision-making without dependence on constant cloud connectivity."
description: "Across wearable livestock monitoring, industrial power systems, and camera-based sensing, a recurring engineering challenge has been getting useful inference — anomaly scoring, behavioral classification, object detection — running directly on microcontroller-class hardware under tight power and memory budgets. This interest is in systematically studying that tradeoff space: model compression techniques, on-device inference latency/accuracy/power tradeoffs, and system architectures that combine edge inference with selective cloud offload for the cases that genuinely need it.\n\n[ADD further detail on specific sub-questions, target hardware classes, or datasets you want to formalize this around.]"
motivation: "Grounded in hands-on TinyML deployment on wearable and industrial hardware — including on-device inference on a BLE-connected cattle estrus-detection wearable and TinyML-based fault detection in an industrial power-monitoring system — where cloud round-trips were not viable given power and connectivity constraints in the field."
researchQuestions:
  - "How much can model size be reduced before task-specific accuracy (e.g. anomaly detection, behavioral classification) degrades unacceptably on target hardware?"
  - "What is the accuracy/power/latency tradeoff between on-device inference and edge-gateway inference for field-deployed IoT hardware?"
  - "[ADD further research questions specific to your intended graduate research focus.]"
technologies: ["TinyML", "Edge AI", "Embedded C/C++", "Sensor Fusion", "ESP32", "STM32"]
relatedProjects: ["cattle-estrus-detection-device", "iiot-predictive-maintenance-power-monitoring", "esp32-s3-ai-ip-camera"]
relatedPublications: []
status: "ongoing"
futureDirection: "[ADD — e.g. formalize as a PhD research direction, build a public benchmark/dataset, or seek a specific lab/collaboration.]"
tags: ["Edge AI", "TinyML", "Embedded Systems"]
featured: true
order: 1
draft: false
---

Open notes and literature to be added here as this research direction develops.
