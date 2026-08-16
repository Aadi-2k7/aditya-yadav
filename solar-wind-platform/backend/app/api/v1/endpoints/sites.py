import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from geoalchemy2.shape import to_shape
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.project import Project
from app.models.site import Site
from app.models.user import User
from app.schemas.site import SiteCreate, SiteRead

router = APIRouter(prefix="/projects/{project_id}/sites", tags=["Sites"])


def _site_to_read(site: Site) -> SiteRead:
    point = to_shape(site.location)
    return SiteRead(
        id=site.id,
        project_id=site.project_id,
        name=site.name,
        latitude=point.y,
        longitude=point.x,
        region=site.region,
        land_area_hectares=site.land_area_hectares,
        elevation_meters=site.elevation_meters,
        existing_infrastructure=site.existing_infrastructure,
        land_ownership=site.land_ownership,
        solar_suitability_score=site.solar_suitability_score,
        wind_suitability_score=site.wind_suitability_score,
        infrastructure_score=site.infrastructure_score,
        investment_score=site.investment_score,
        overall_deployment_score=site.overall_deployment_score,
        suitability_category=site.suitability_category,
    )


@router.post("", response_model=SiteRead, status_code=status.HTTP_201_CREATED)
def register_site(
    project_id: uuid.UUID,
    payload: SiteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SiteRead:
    project = db.get(Project, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Project not found")

    site = Site(
        id=uuid.uuid4(),
        project_id=project_id,
        name=payload.name,
        location=f"SRID=4326;POINT({payload.longitude} {payload.latitude})",
        region=payload.region,
        land_area_hectares=payload.land_area_hectares,
        elevation_meters=payload.elevation_meters,
        existing_infrastructure=payload.existing_infrastructure,
        land_ownership=payload.land_ownership,
    )
    db.add(site)
    db.commit()
    db.refresh(site)
    return _site_to_read(site)


@router.get("", response_model=list[SiteRead])
def list_sites(
    project_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[SiteRead]:
    sites = db.query(Site).filter(Site.project_id == project_id).all()
    return [_site_to_read(s) for s in sites]


@router.get("/{site_id}", response_model=SiteRead)
def get_site(
    project_id: uuid.UUID,
    site_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SiteRead:
    site = db.get(Site, site_id)
    if not site or site.project_id != project_id:
        raise HTTPException(status_code=404, detail="Site not found")
    return _site_to_read(site)


@router.get("/{site_id}/compare/{other_site_id}", response_model=list[SiteRead])
def compare_sites(
    project_id: uuid.UUID,
    site_id: uuid.UUID,
    other_site_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[SiteRead]:
    """Site comparison, per PDF section: Project & Site Management."""
    sites = (
        db.query(Site)
        .filter(Site.id.in_([site_id, other_site_id]), Site.project_id == project_id)
        .all()
    )
    if len(sites) != 2:
        raise HTTPException(status_code=404, detail="One or both sites not found")
    return [_site_to_read(s) for s in sites]
