---
title: "Deploying TinyML on ESP32-S3: From Trained Model to Real-Time Inference"
date: 2026-04-25
summary: "The practical pipeline for taking a trained model to real-time, on-device inference on an ESP32-S3 — quantization, TFLite Micro conversion, and the memory and latency tradeoffs that decide whether it fits."
tags: ["TinyML", "Edge AI", "ESP32-S3", "Machine Learning", "AIoT"]
category: "AI / Edge"
coverImage: "/images/blog/tinyml-pipeline.svg"
relatedProjects: ["cattle-estrus-detection-device"]
relatedResearch: ["embedded-ai-tinyml-edge-intelligence"]
featured: true
draft: false
---

Getting a trained model onto an MCU is a different discipline from training it. A model that scores well in a notebook can be entirely unusable on-device if it doesn't fit in SRAM, doesn't run fast enough between sensor samples, or draws more current than the power budget allows. Here's the pipeline I use to go from trained model to real-time inference on an ESP32-S3, and the constraints that shape every step of it.

## Start with the deployment target's limits, not the model architecture

Before training anything, I work backward from what the target can actually support: how much SRAM/PSRAM is available after the rest of the firmware's needs are accounted for, what inference latency the application requires (a wake-word detector and a once-a-minute anomaly classifier have very different latency budgets), and what power budget the device has for the compute-heavy moments of inference versus its sleep state. These numbers bound the model size and complexity before a single layer gets designed — a model that's technically more accurate but doesn't fit the arena size or the latency budget isn't a viable option, no matter how good its validation accuracy looks.

## Train and validate first, at full precision

Model development still happens in a normal training environment — TensorFlow/Keras on a workstation or in the cloud, with the full float32 precision the framework defaults to. This is where the actual machine learning work happens: architecture choice, data collection and labeling, augmentation, and validation against a held-out set that genuinely represents field conditions, not just clean lab data. On a cattle estrus detection device, this meant validating against motion and temperature sensor data collected across real animals and real barn conditions, not a curated dataset — the field noise characteristics matter as much as the underlying signal pattern.

## Quantize deliberately, and re-validate after

Post-training quantization — converting weights and activations from float32 to int8 — is what makes inference on a microcontroller's integer-optimized instruction set fast and memory-efficient; it can shrink model size roughly fourfold and speed up inference significantly on hardware without a floating-point-optimized accelerator. The ESP32-S3's SIMD instructions in particular are tuned for exactly this kind of integer workload, which is one of the reasons it's a strong TinyML target within the Espressif lineup.

The step people skip is re-validating accuracy *after* quantization, on the same held-out set. Quantization is not free — it introduces rounding error at every layer, and for some architectures and some classes of input, that error compounds into a real accuracy drop. If the quantized model's accuracy drop is unacceptable, options include quantization-aware training (simulating quantization effects during training so the model learns to be robust to them) rather than accepting whatever post-training quantization produces.

## Convert to TFLite Micro and budget the arena

The quantized model gets converted to a TensorFlow Lite flatbuffer and then typically embedded as a C byte array compiled directly into firmware. TFLite Micro's interpreter runs against a fixed memory arena you allocate up front — this is the number that has to fit within your real SRAM/PSRAM budget alongside everything else the firmware needs (network stack, sensor buffers, application state). Getting the arena size wrong is a common failure mode: too small and the interpreter fails to allocate tensors at runtime; sizing it correctly requires either the interpreter's own reporting tools or empirical measurement across representative inputs, not a guess.

## The runtime loop

On-device, the pattern is consistent regardless of application: sample the sensor (or camera frame), preprocess into the same feature representation the model was trained on (a windowed FFT for vibration/audio-style signals, a normalized image tensor for vision), run the TFLite Micro interpreter, and act on the output — publish an alert, trigger a local actuator, log an event. Preprocessing has to exactly match what happened during training; a mismatch here is one of the most common causes of a model that validated well but performs poorly in deployment, and it's easy to introduce accidentally by having slightly different windowing or normalization code in the embedded preprocessing path versus the training pipeline.

## Where the real tradeoff lives

Every decision in this pipeline trades against the same three resources: memory footprint, inference latency, and power draw during the compute-heavy inference window. A larger model with more capacity might improve accuracy at the cost of an arena size that doesn't fit, or an inference time that's too slow to keep up with the sensor's sample rate, or a current draw during inference that blows the battery budget on a device that's supposed to run for months on a small cell. There's no universal right answer — the right model is the smallest one that clears your accuracy bar within all three constraints simultaneously, and finding it usually means iterating the training-quantize-deploy loop more than once with the real hardware's numbers in hand, not just the target specification.

## The short version

1. Set memory, latency, and power budgets from the actual hardware before training.
2. Train and validate at full precision against data that represents real field conditions.
3. Quantize to int8, then re-validate accuracy on the same held-out set — don't assume it survived.
4. Convert to TFLite Micro, size the arena against your real available memory.
5. Match preprocessing exactly between training and firmware.
6. Iterate against the hardware's real numbers, not just the spec sheet's.

TinyML on a chip like the ESP32-S3 is genuinely capable today — the constraint isn't whether the hardware can do it, it's whether the pipeline respects the hardware's limits at every step.
