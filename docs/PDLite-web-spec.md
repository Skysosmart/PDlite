# PDLite Web System Design Specification

## Overview
A comprehensive website for PDLite, a Parkinson’s Disease early risk detection platform using salivary biomarkers. Two main user groups: medical professionals (doctors/admins) and patients. The site also retrieves diagnostic data from ESP32/Raspberry Pi hardware that drives sample analysis and data transmission.

## Theme
- White background
- Light gray card/container backgrounds
- Soft green for buttons, highlights, and chart lines
- Use borders, shadowed cards, and rounded containers for a clean UI

## 1. Login Page
- Username and password fields
- User role selection (Doctor or Patient)
- Simple animation on login success
- Redirect to the appropriate dashboard

## 2. Doctor Dashboard
### a. Search by HN (Hospital Number)
- Input field to enter HN
- Button to fetch patient profile and risk data

### b. Patient Risk Overview
- Patient info: name, age, last test date
- Chart showing:
  - Total alpha-synuclein
  - Oligomeric alpha-synuclein
  - DJ-1 protein
  - Tau protein
- Risk level indicator (Low / Moderate / High)
- Recommendation panel for next steps

### c. Device Data Integration
- Data fetched via Raspberry Pi connected to ESP32
- Real-time result JSON from local database or API
- ESP32 controls biosensor inputs; Pi processes colorimetric results via camera and sends via HTTP POST

## 3. Patient Dashboard
### a. Result Overview
- Card showing test date and result summary
- Simplified text explanation of results
- Risk classification color-coded: Green (Safe), Yellow (Moderate), Red (High)

### b. Educational Section
- Basics on Parkinson’s disease, early symptoms, and prevention tips
- Content updated dynamically via CMS backend

### c. Contact & Appointment
- Appointment booking form
- Dropdown for clinic locations
- Preferred date/time selection
- Message field

## 4. Technology Stack and Responsibilities
### Hardware Integration
- ESP32: controls sensors for biomarker signal conversion
- Camera module (Raspberry Pi): detects reagent color changes
- Raspberry Pi 4: processes image, runs lightweight server, uploads results via REST API

### Software Developers
- Frontend (HTML, Tailwind CSS, JavaScript, Chart.js): UI/UX, responsive layout, dashboard interactions
- Backend (Node.js or Flask or Firebase): API handling, database management, secure login, HN data linkage

### Hardware Developer
- Manages ESP32 firmware
- Interfaces with biosensor modules
- Sets up Raspberry Pi image processing and data output

## Notes
This spec can be used directly as a prompt for development or prototyping. Mockups and code components can be generated as a follow-up.

