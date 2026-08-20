---
title: "Cattle Estrus Detection Device — Edge AI Wearable for Smart Livestock Monitoring"
type: engineering
summary: "Edge AI wearable sensor device for real-time estrus (heat) detection in dairy cattle, predicting optimal artificial insemination timing from on-device sensor fusion."
problemStatement: "Missed or mistimed detection of the estrus cycle in dairy cattle reduces artificial-insemination success rates and overall reproductive efficiency for farms."
approach: "Designed and developed an edge AI-based wearable sensor device for real-time estrus detection in dairy cattle. The system integrates motion, temperature, and behavioral data using embedded machine learning algorithms to predict optimal artificial insemination timing, with a low-power hardware architecture and wireless IoT connectivity for continuous farm monitoring."
hardware:
  - "ARM-based embedded module"
  - "IMU (motion sensing)"
  - "Temperature sensor"
  - "Custom PCB (Altium)"
software:
  - "Wi-Fi / MQTT connectivity"
  - "Cloud integration for farm-level monitoring"
algorithms:
  - "TinyML on-device inference"
  - "Sensor fusion (IMU + temperature) for behavioral pattern recognition"
architectureNotes: "Wearable sensor node performs on-device TinyML inference over fused IMU and temperature data, then reports predictions over Wi-Fi/MQTT to a cloud backend for continuous farm-level monitoring."
results: "Deployed to market with field validation on livestock farms. [ADD QUANTITATIVE RESULTS — e.g. detection accuracy, battery life, number of farms/animals monitored — once available.]"
myContribution: "Led end-to-end development as Hardware & System Architect: hardware design, firmware development, AI model deployment, and field validation with livestock farms. Also delivered PCB design, firmware, and system design for the related BAU-RIC / Adorsho PraniSheba research and engineering work."
images:
  - "/images/projects/cattle-estrus-detection-device-1.png"
  - "/images/projects/cattle-estrus-detection-device-2.png"
coverImage: "/images/projects/cattle-estrus-detection-device-1.png"
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Core evidence for research interests in AIoT for precision livestock monitoring, TinyML on resource-constrained wearables, and sensor fusion for behavioral inference."
technologies: ["Edge AI", "TinyML", "Sensor Fusion", "IMU", "Wi-Fi", "MQTT", "PCB Design (Altium)", "Low-Power Design", "Cloud Integration"]
categories: ["AIoT", "Edge AI", "IoT", "PCB"]
status: "completed"
startDate: ""
endDate: ""
tags: ["tinyml", "edge-ai", "livestock", "wearable", "sensor-fusion"]
featured: true
order: 2
draft: false
---

In market, with field validation on livestock farms. This project spans work done at Adorsho PraniSheba and the BAU-RIC research fellowship. Project images pending upload — see `public/images/projects/`.
