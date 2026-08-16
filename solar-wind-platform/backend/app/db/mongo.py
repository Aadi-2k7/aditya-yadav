from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings

mongo_client = AsyncIOMotorClient(settings.MONGO_URL)
mongo_db = mongo_client[settings.MONGO_DB]

# Collections used across the platform (secondary/unstructured storage):
# - raw_satellite_metadata: Copernicus Sentinel scene metadata
# - generated_reports: PDF/Excel export payloads before rendering
# - audit_logs: free-form system/security event logs
