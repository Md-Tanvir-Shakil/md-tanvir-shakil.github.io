---
title: "Smart Zigbee Gateway — Dual-Radio ESP32-S3 + ESP32-C6 IoT Gateway (UK Project)"
type: engineering
summary: "Dual-chip IoT gateway bridging a Zigbee mesh network to Wi-Fi/cloud, pairing an ESP32-S3 application processor with an ESP32-C6 802.15.4 radio for Zigbee connectivity."
problemStatement: ""
approach: "Architected a dual-chip gateway pairing an ESP32-S3 (application processor, Wi-Fi/BLE, cloud connectivity) with an ESP32-C6 (802.15.4 radio) acting as the Zigbee coordinator/radio front-end, bridged over an on-board serial interface. This splits the general-purpose application workload from the time-sensitive Zigbee radio stack across two purpose-built SoCs on a single custom PCB."
hardware:
  - "ESP32-S3-WROOM-1"
  - "ESP32-C6-WROOM-1"
  - "Custom PCB"
software:
  - "Zigbee stack on ESP32-C6"
  - "Wi-Fi/cloud connectivity on ESP32-S3"
algorithms: []
architectureNotes: "ESP32-C6 runs the Zigbee (802.15.4) radio stack as coordinator for the mesh network, communicating over an inter-chip serial link to the ESP32-S3, which owns Wi-Fi connectivity and bridges Zigbee device data to the cloud/local network."
results: ""
myContribution: "Architected and led development: system architecture, dual-chip PCB design, and inter-chip bridging firmware."
images:
  - "/images/projects/smart-zigbee-gateway-1.jpeg"
  - "/images/projects/smart-zigbee-gateway-2.jpeg"
  - "/images/projects/smart-zigbee-gateway-3.jpeg"
  - "/images/projects/smart-zigbee-gateway-4.jpeg"
coverImage: "/images/projects/smart-zigbee-gateway-1.jpeg"
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Direct evidence of multi-radio embedded gateway architecture and IoT protocol bridging for real-world UK-market deployment."
technologies: ["ESP32-S3", "ESP32-C6", "Zigbee", "802.15.4", "Wi-Fi", "PCB Design", "Firmware"]
categories: ["IoT", "Embedded Systems", "PCB", "Firmware"]
status: "in-progress"
startDate: ""
endDate: ""
tags: ["zigbee", "esp32-s3", "esp32-c6", "gateway", "uk-project"]
featured: true
order: 14
draft: false
---

UK-market project. Currently in board bring-up / firmware development, shown here under active flashing and testing.
