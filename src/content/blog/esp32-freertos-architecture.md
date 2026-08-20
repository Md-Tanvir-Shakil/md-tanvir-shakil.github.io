---
title: "(Sample) Structuring FreeRTOS Tasks on ESP32 for IoT Sensor Nodes"
date: 2026-06-01
author: "MD. Tanvir Shakil"
summary: "Example article — replace with real technical writing. Notes on splitting sensing, networking, and power management into separate FreeRTOS tasks with sane priorities and queue-based communication."
tags: ["ESP32", "FreeRTOS", "Firmware"]
category: "Embedded Systems"
relatedProjects: []
relatedResearch: []
featured: false
draft: true
---

This is example/template content shipped with the portfolio. Replace it with your own
technical writing — the kind of article that shows how you think through a real
firmware or hardware problem, not just a summary of what a tool does.

## Suggested structure for a strong technical article

1. **The problem** — what broke, or what constraint forced a design decision.
2. **Options considered** — briefly, with tradeoffs.
3. **What you built** — code snippets welcome; syntax highlighting is enabled by default.
4. **What you'd do differently** — this is what makes writing useful to reviewers and professors.

```c
// Example: a minimal FreeRTOS task skeleton
void sensor_task(void *pvParameters) {
    for (;;) {
        // read sensor, push to queue
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}
```

Delete this file (or set `draft: true`) once you've added your own articles.
