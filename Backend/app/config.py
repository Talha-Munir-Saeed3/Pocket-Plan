from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    BACKEND_URL: str = "http://localhost:8000"
    JWT_SECRET: str = ""
    FIREBASE_PROJECT_ID: str = ""
    GEMINI_API_KEY: str = ""


settings = Settings()
