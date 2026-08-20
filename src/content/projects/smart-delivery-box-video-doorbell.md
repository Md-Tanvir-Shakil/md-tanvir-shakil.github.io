---
title: "Smart Delivery Box Video Doorbell — ESP32-P4 + ESP32-C6 (UK Project)"
type: engineering
summary: "Camera-enabled smart delivery box / video doorbell system built on a modular multi-board PCB stack, combining an ESP32-P4 vision/application module with an ESP32-C6 connectivity module."
problemStatement: ""
approach: "Designed a modular multi-board PCB stack (branded DeliveryBoxx Ltd, Vs. 1.0) for a smart delivery box with an integrated video doorbell. An ESP32-P4 module handles the camera/vision workload, an ESP32-C6 module provides wireless connectivity, and a separate board carries the camera (FPC connector), an Ethernet jack, and status indicators, with a further board for display/interface."
hardware:
  - "ESP32-P4-Module"
  - "ESP32-C6-Module"
  - "Camera module (FPC connector)"
  - "Ethernet magnetics (HanRun)"
  - "Multi-board custom PCB stack (Altium)"
software: []
algorithms: []
architectureNotes: "Camera and vision processing run on the ESP32-P4 board; the ESP32-C6 module provides Wi-Fi/wireless connectivity for remote notification and video access; a separate interconnected board carries the camera FPC, Ethernet jack, and auxiliary connectors, split across a three-board modular stack."
results: ""
myContribution: "Led hardware architecture and multi-board PCB design and ESP32-P4/ESP32-C6 system partitioning."
images:
  - "/images/projects/smart-delivery-box-video-doorbell-1.jpeg"
coverImage: "/images/projects/smart-delivery-box-video-doorbell-1.jpeg"
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Demonstrates embedded computer vision hardware architecture (ESP32-P4) paired with dedicated wireless connectivity (ESP32-C6) in a modular multi-board product design."
technologies: ["ESP32-P4", "ESP32-C6", "Camera Integration", "Ethernet", "PCB Design (Altium)"]
categories: ["IoT", "Computer Vision", "Embedded Systems", "PCB"]
status: "in-progress"
startDate: ""
endDate: ""
tags: ["esp32-p4", "esp32-c6", "video-doorbell", "delivery-box", "uk-project"]
featured: true
order: 15
draft: false
---

UK-market project, branded DeliveryBoxx Ltd. Bare PCB boards shown here (pre-enclosure), spanning camera, connectivity, and interface modules.
