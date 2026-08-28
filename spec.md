# Qiskit Fall Fest 2026 — Website

Build a **modern, responsive, lightweight website** for Qiskit Fall Fest 2026.

## Stack

* **Frontend:** Next.js + React + TypeScript + Tailwind CSS
* **Backend:** Python FastAPI — **registration only**
* **Registration storage:** CSV file — no PostgreSQL/database
* **Admin:** JWT authentication
* **Deployment:** Docker Compose

## Website

Create these static frontend pages:

* **Home** — hero, event information, objectives, goal, highlights, registration CTA
* **Resources** — quantum computing, Qiskit, QML, tutorials, courses and useful links
* **Speakers** — speaker profiles and sessions
* **Organizers** — organizing team
* **Supporters** — supporting organizations/logos
* **About Us** — organization, vision and mission
* **Register** — registration form

Use a **modern quantum-tech event aesthetic** with clean typography, subtle quantum-inspired visuals, tasteful animations, responsive design, and mobile navigation.

All pages except registration should be **static frontend content**. Do not create APIs or database storage for them.

## Registration

Collect:

* Name
* Email
* Phone
* Organization/Institution
* City/Country
* Participant type
* Area of interest
* Experience level
* Qiskit experience
* Expectations
* Referral source
* Required consent checkboxes

Registration flow:

```text
Next.js Registration Form
          ↓
       FastAPI
          ↓
   registrations.csv
          ↓
   Registration ID
```

FastAPI must:

* Validate input
* Prevent duplicate email registrations
* Generate `QFF-XXXXXX` registration ID
* Safely append data to CSV
* Return success/error response
* Support authenticated admin access
* Provide CSV export

Store:

```text
data/registrations.csv
```

Persist the `data` directory through Docker.

## Admin

Create a minimal admin area for:

* Admin login
* View/search registrations
* Filter registrations
* Update registration status
* Export CSV

Use JWT authentication and secure password handling.

## Backend

Only create APIs required for:

```text
POST /api/v1/registrations
GET  /api/v1/registrations/{registration_id}

POST /api/v1/admin/login
GET  /api/v1/admin/registrations
GET  /api/v1/admin/registrations/export
PATCH /api/v1/admin/registrations/{registration_id}
```

FastAPI should provide `/docs` and `/redoc`.

## Quality

Include:

* Responsive/mobile-first UI
* Accessibility basics
* SEO metadata
* Client + server validation
* Rate limiting on registration
* Secure `.env` configuration
* Error/loading/success states
* Basic tests
* README with setup and deployment instructions

## Project Structure

```text
qiskit-fall-fest-2026/
├── frontend/
├── backend/
├── data/
│   └── registrations.csv
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Implementation

Do not generate the entire application at once.

First provide the **architecture, project structure, registration data model, API contracts, and implementation plan**.

Then implement incrementally.

Use placeholders where actual event information is unavailable. **Do not invent real speaker, team, or supporter information.**

Keep the application **simple, lightweight, maintainable, and production-ready**.
