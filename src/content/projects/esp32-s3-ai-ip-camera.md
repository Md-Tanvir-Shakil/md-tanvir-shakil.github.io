---
title: "ESP32-S3 Based AI IP Camera with Human Tracking"
type: engineering
summary: "Low-cost AI-enabled IP camera on ESP32-S3 performing on-device real-time human detection and tracking, with live RTSP streaming and optional pan-tilt servo control."
problemStatement: "Cloud-dependent smart cameras add latency and privacy exposure; a low-cost, fully on-device human-tracking camera was needed for local, private surveillance and automation use cases."
approach: "Designed and developed a low-cost AI-enabled IP camera system based on the ESP32-S3 microcontroller. The system integrates an OV2640 camera sensor with on-device edge AI to perform real-time human detection and tracking, leveraging the ESP32-S3's vector instructions and AI acceleration to process video locally, minimizing latency and preserving privacy."
hardware:
  - "ESP32-S3"
  - "OV2640 camera sensor"
  - "SD card storage"
  - "Pan-tilt servo motors (optional)"
software:
  - "ESP-IDF"
  - "FreeRTOS"
  - "ESP-WHO (on-device human detection)"
  - "RTSP/HTTP video streaming"
  - "OTA updates"
algorithms:
  - "On-device human detection and tracking (ESP-WHO)"
architectureNotes: "Camera captures locally via OV2640, runs on-device human detection/tracking using ESP-WHO on the ESP32-S3's AI-accelerated core, streams live video over Wi-Fi (HTTP/RTSP) to a web dashboard, and can drive pan-tilt servos to keep the subject centered — all without a cloud round-trip for inference."
results: ""
myContribution: "Designed and developed the system as Hardware & RTOS Architect, including firmware architecture on ESP-IDF/FreeRTOS."
images:
  - "/images/projects/esp32-s3-ai-ip-camera-1.png"
  - "/images/projects/esp32-s3-ai-ip-camera-2.png"
coverImage: "/images/projects/esp32-s3-ai-ip-camera-1.png"
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Direct evidence for research interests in embedded computer vision and edge AI on resource-constrained SoCs."
technologies: ["ESP32-S3", "OV2640", "Edge AI", "ESP-WHO", "FreeRTOS", "RTSP", "OTA Updates", "Embedded C/C++", "PCB Design (Altium)"]
categories: ["Edge AI", "Computer Vision", "Embedded Systems", "Firmware"]
status: "in-progress"
startDate: ""
endDate: ""
tags: ["esp32-s3", "computer-vision", "edge-ai", "human-tracking"]
featured: false
order: 6
draft: false
---

In development. Project images pending upload — see `public/images/projects/`.
