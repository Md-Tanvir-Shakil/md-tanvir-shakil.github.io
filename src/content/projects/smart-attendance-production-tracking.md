---
title: "Smart Attendance & Production Tracking System — RFID + QR Code"
type: engineering
summary: "Factory-floor terminal combining RFID badge-in attendance with QR/barcode-based style tracking, showing live work time, NPT, and production target vs. achieved counts per operator."
problemStatement: "[ADD — the specific factory-floor visibility problem this system addresses, e.g. manual attendance/production logging.]"
approach: "Designed an embedded terminal that authenticates operators via RFID tap and captures style/production data via QR or barcode scan, displaying real-time work details on an onboard screen — in-time, work time, non-productive time (NPT), active style, and target vs. achieved production counts, alongside defect/rejection counts."
hardware:
  - "Embedded display"
  - "RFID reader"
  - "QR/barcode scanner"
  - "Physical control buttons"
  - "Custom enclosure"
software: []
algorithms:
  - "Real-time work-time and NPT tracking per operator session"
architectureNotes: "RFID tap authenticates the operator and starts a work session; a QR/barcode scan associates the session with a production style; the terminal tracks work time, NPT, and target-vs-achieved counts locally and displays them live, networked over Wi-Fi (device IP shown on-screen) for centralized monitoring."
results: "[ADD MEASURABLE RESULTS once available — e.g. number of terminals deployed, factories using the system.]"
myContribution: "Led development as Senior Solution Architect (IoT, IIoT) at MBM Group: system design, embedded UI, and RFID/QR integration."
images:
  - "/images/projects/smart-attendance-production-tracking-1.jpeg"
  - "/images/projects/smart-attendance-production-tracking-2.jpeg"
  - "/images/projects/smart-attendance-production-tracking-3.jpeg"
coverImage: "/images/projects/smart-attendance-production-tracking-1.jpeg"
githubRepo: ""
demoUrl: ""
documentationUrl: ""
researchRelevance: "Directly relevant to research interests in industrial IoT and real-time production monitoring in manufacturing environments, extending the machine-level monitoring work at Smart Sewing Machine Productivity Monitoring to operator-level attendance and production tracking."
technologies: ["RFID", "QR Code", "Embedded UI", "Wi-Fi", "Industrial IoT"]
categories: ["IoT", "IIoT", "Industrial Automation", "Embedded Systems"]
status: "completed"
startDate: ""
endDate: ""
tags: ["rfid", "qr-code", "attendance", "production-tracking", "iiot"]
featured: true
order: 16
draft: false
---

Deployed on factory floor at MBM Group, tracking operator attendance and style-level production in real time.
