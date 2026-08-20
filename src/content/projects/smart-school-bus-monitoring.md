---
title: "Smart School Bus Monitoring System — Real-Time Student Safety & Tracking Platform"
type: engineering
summary: "Real-time school bus monitoring system with student ID authentication, GPS/timestamp logging, and photo capture on boarding, deployed to 20+ operational devices since 2023."
problemStatement: "Parents and school administrators lacked real-time visibility into student boarding events and bus location during transportation, limiting safety and accountability."
approach: "Designed and deployed a real-time smart school bus monitoring system to enhance student safety and parental visibility during transportation. The system captures student ID authentication events, automatically records the timestamp and GPS location, and takes a photo upon boarding, transmitting data instantly to guardians via mobile notifications."
hardware:
  - "ESP32"
  - "RFID/NFC reader"
  - "GPS module"
  - "Camera module"
  - "Custom PCB"
software:
  - "Wi-Fi connectivity"
  - "Secure data transmission"
  - "Mobile notification integration"
algorithms:
  - "ID authentication event capture with timestamp + GPS tagging"
architectureNotes: "Onboard unit authenticates each student via RFID/NFC, tags the event with GPS location and timestamp, captures a boarding photo, and transmits the record over Wi-Fi to a backend that pushes real-time notifications to guardians."
results: "20+ operational devices deployed and in live field operation since 2023."
myContribution: "Designed and deployed the system end-to-end as Hardware & System Architect, including field deployment and ongoing system optimization."
images:
  - "/images/projects/smart-school-bus-monitoring-1.png"
  - "/images/projects/smart-school-bus-monitoring-2.png"
coverImage: "/images/projects/smart-school-bus-monitoring-1.png"
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Demonstrates real-world, at-scale IoT deployment and field-reliability engineering relevant to industrial/consumer IoT research."
technologies: ["ESP32", "RFID/NFC", "GPS", "Camera Integration", "Wi-Fi", "PCB Design", "Secure Data Transmission"]
categories: ["IoT", "Embedded Systems", "PCB"]
status: "completed"
startDate: "2023"
endDate: "present"
tags: ["esp32", "rfid", "gps", "safety", "field-deployment"]
featured: true
order: 4
draft: false
---

In market with 20+ operational devices deployed since 2023. Project images pending upload — see `public/images/projects/`.
