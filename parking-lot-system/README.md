# 🚗 Parking Lot Management System - NestJS

A full-featured **Parking Lot System** built using **NestJS**, demonstrating modular architecture, service design, and real-time availability tracking of parking spots.

---

## 📖 Overview

This project simulates a multi-level parking lot with support for:
- Multiple vehicle types (Motorcycle, Car, Truck)
- Type-specific parking slot assignment
- Real-time slot availability
- Entry and exit with ticket generation
- Simulated concurrency handling

---

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **UUID Generator**: `uuid` package
- **HTTP Client**: Testable with [Thunder Client](https://www.thunderclient.com/) or Postman

---
## 📦 Features

- ✅ Multi-level parking structure
- ✅ Vehicle-type specific parking slot logic
- ✅ Ticket generation on entry
- ✅ Ticket validation and unpark logic
- ✅ Real-time slot availability tracking
- ✅ Clean separation using DTOs, Services, Controllers, and Entities

---

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Nest CLI](https://docs.nestjs.com/cli/overview):  
  ```bash
  npm install -g @nestjs/cli
