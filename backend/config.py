import pathlib
from typing import Optional

from pydantic import AnyHttpUrl, BaseSettings

root = pathlib.Path(__file__).parent
print(root)
# This will always give the correct path as long as .env is in the parent directory
env_file = root / '.env'

class PydanticSettings(BaseSettings):
    project_root: pathlib.Path = root
    secret: str
    db_uri: str = "sqlite+pysqlite:///app.db"
    token_url: str = "/auth/login"

    class Config:
        env_file = '.env'

Config = PydanticSettings(_env_file=env_file)
	

class UvicornSettings:
	USE_RELOADER: bool = True # set this to 'False' in production as it takes a lot of resources to use.
	LOG_LEVEL: str = 'info' # It is recommended to use 'warning' in production to reduce log clutter.
	PORT: int = 8003 # The port of the ASGI server. Make sure this port is available on your server.
	MAX_CONTENT_SIZE: Optional[int] = None # The max post content size. Set to `None` for unlimitted (not recommended if users can upload)

class FastAPISettings:
	DEBUG: bool = True # turn this off in production.
