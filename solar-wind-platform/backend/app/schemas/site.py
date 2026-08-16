import uuid

from pydantic import BaseModel, ConfigDict

from app.models.site import SuitabilityCategory


class SiteCreate(BaseModel):
    name: str
    latitude: float
    longitude: float
    region: str | None = None
    land_area_hectares: float | None = None
    elevation_meters: float | None = None
    existing_infrastructure: str | None = None
    land_ownership: str | None = None


class SiteRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    project_id: uuid.UUID
    name: str
    latitude: float
    longitude: float
    region: str | None
    land_area_hectares: float | None
    elevation_meters: float | None
    existing_infrastructure: str | None
    land_ownership: str | None
    solar_suitability_score: float | None
    wind_suitability_score: float | None
    infrastructure_score: float | None
    investment_score: float | None
    overall_deployment_score: float | None
    suitability_category: SuitabilityCategory | None


class ProjectCreate(BaseModel):
    name: str
    description: str | None = None
    region: str | None = None


class ProjectRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: str | None
    region: str | None
    owner_id: uuid.UUID
