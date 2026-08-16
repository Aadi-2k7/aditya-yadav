from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Solar & Wind Deployment Intelligence Platform"
    API_V1_PREFIX: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Security
    SECRET_KEY: str = "change-this-to-a-long-random-string"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # OAuth2
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""

    # PostgreSQL + PostGIS (primary)
    POSTGRES_USER: str = "swdi_user"
    POSTGRES_PASSWORD: str = "swdi_password"
    POSTGRES_DB: str = "swdi_db"
    POSTGRES_HOST: str = "postgres"
    POSTGRES_PORT: int = 5432

    # MongoDB (secondary)
    MONGO_USER: str = "swdi_mongo"
    MONGO_PASSWORD: str = "swdi_mongo_password"
    MONGO_HOST: str = "mongo"
    MONGO_PORT: int = 27017
    MONGO_DB: str = "swdi_mongo_db"

    # External APIs
    NASA_POWER_BASE_URL: str = "https://power.larc.nasa.gov/api"
    OPENWEATHER_API_KEY: str = ""
    COPERNICUS_SENTINEL_USER: str = ""
    COPERNICUS_SENTINEL_PASSWORD: str = ""

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    @property
    def MONGO_URL(self) -> str:
        return (
            f"mongodb://{self.MONGO_USER}:{self.MONGO_PASSWORD}"
            f"@{self.MONGO_HOST}:{self.MONGO_PORT}"
        )

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
