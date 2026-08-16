# Solar & Wind Deployment Intelligence Platform

An AI-powered geospatial intelligence platform that recommends optimal locations for solar and wind renewable energy projects by analyzing environmental, geographic, climatic, and infrastructure-related factors.

Built as an 8-week, 4-milestone project integrating machine learning, GIS tooling, and external environmental APIs.

## Status

🟢 **Milestone 1 complete** — Project Initialization, Design Process & Core Setup
🔲 Milestone 2 — Environmental Intelligence & Resource Prediction (in progress)
🔲 Milestone 3 — Site Intelligence & Optimization
🔲 Milestone 4 — Analytics, Testing & Deployment

## What's implemented so far

- JWT + OAuth2-style authentication
- Role-based access control (Renewable Energy Planner, GIS Analyst, Project Manager, Administrator)
- Project & site management with PostGIS-backed geospatial data
- Full registration + login flow in the UI, with role selection
- Dockerized multi-service architecture (Postgres+PostGIS, MongoDB, FastAPI backend, Next.js frontend)

## Tech stack

**Backend:** FastAPI, JWT + OAuth2, PostgreSQL + PostGIS (via GeoAlchemy2), MongoDB, Alembic
**Frontend:** Next.js, React, Tailwind CSS
**ML (upcoming milestones):** XGBoost, LightGBM, Random Forest, TensorFlow, PyTorch
**GIS (upcoming milestones):** GDAL, Rasterio, GeoPandas, Shapely
**External APIs (upcoming milestones):** NASA POWER, OpenWeather, Copernicus Sentinel Hub, OpenStreetMap
**Visualization (upcoming milestones):** Plotly, Leaflet.js, Mapbox, Chart.js
**Infrastructure:** Docker, Docker Compose

## Getting started

See [SETUP.md](./SETUP.md) for full local setup instructions.

Quick start (requires Docker Desktop):

\`\`\`bash
docker compose up --build postgres mongo backend
docker compose exec backend alembic upgrade head
docker compose up --build frontend
\`\`\`

Then open:
- `http://localhost:3000` — frontend
- `http://localhost:8000/docs` — API docs (Swagger)

## Project structure

\`\`\`
.
├── backend/          # FastAPI app, models, migrations
├── frontend/          # Next.js app
├── docker-compose.yml
└── SETUP.md
\`\`\`
