import enum
import uuid
from datetime import datetime

from geoalchemy2 import Geometry
from sqlalchemy import DateTime, Enum, Float, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class SuitabilityCategory(str, enum.Enum):
    EXCELLENT = "excellent"
    HIGHLY_SUITABLE = "highly_suitable"
    MODERATELY_SUITABLE = "moderately_suitable"
    LOW_SUITABILITY = "low_suitability"
    UNSUITABLE = "unsuitable"


class Site(Base):
    __tablename__ = "sites"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    project_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"))

    # Site Information (per PDF section: Project & Site Management)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    # PostGIS point: (longitude, latitude), SRID 4326 = WGS84
    # spatial_index=False: GeoAlchemy2 would otherwise auto-create a GiST index via
    # its own DDL event when the table is created, which then conflicts with
    # Alembic's autogenerate also wanting to create the same index explicitly.
    # We let Alembic own index creation instead, so migrations stay authoritative.
    location: Mapped[str] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326, spatial_index=False), nullable=False
    )
    region: Mapped[str | None] = mapped_column(String(255), nullable=True)
    land_area_hectares: Mapped[float | None] = mapped_column(Float, nullable=True)
    elevation_meters: Mapped[float | None] = mapped_column(Float, nullable=True)
    existing_infrastructure: Mapped[str | None] = mapped_column(String(500), nullable=True)
    land_ownership: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # Scoring Engine outputs (weighted model per PDF section 10)
    solar_suitability_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    wind_suitability_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    infrastructure_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    investment_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    overall_deployment_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    suitability_category: Mapped[SuitabilityCategory | None] = mapped_column(
        Enum(SuitabilityCategory), nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    project: Mapped["Project"] = relationship(back_populates="sites")