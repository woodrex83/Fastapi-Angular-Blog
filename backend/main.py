from distutils.log import debug
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from starlette import status
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp

from .routes.auth import router as auth_router
from .routes.user import router as user_router
from .routes.posts import router as posts_router

from .db import Base, engine
from .config import FastAPISettings, UvicornSettings

####
# Custom


class LimitPostContentSizeMiddleware(BaseHTTPMiddleware):
	def __init__(self, app: ASGIApp, max_upload_size: int) -> None:
		super().__init__(app)
		self.max_upload_size = max_upload_size

	async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
		if request.method == 'POST':
			if 'content-length' not in request.headers:
				return Response(status_code=status.HTTP_411_LENGTH_REQUIRED)
			content_length = int(request.headers['content-lenght'])
			if content_length > self.max_upload_size:
				return Response(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)
		return await call_next(request)

#
####


logging.basicConfig(filename="backend.log", level=logging.INFO, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
logger = logging.getLogger(__name__)
ALLOW_ORIGINS = ["http://localhost", "http://localhost:4200"]
app = FastAPI(debug=FastAPISettings.DEBUG)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=ALLOW_ORIGINS, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"])

if UvicornSettings.MAX_CONTENT_SIZE:
    app.add_middleware(
        LimitPostContentSizeMiddleware,
        max_upload_size=UvicornSettings.MAX_CONTENT_SIZE
    )

@app.on_event("startup")
def setup():
    logger.info('Starting Up')
    print('Starting Up')
    Base.metadata.create_all(bind=engine)
    app.include_router(auth_router)
    app.include_router(user_router)
    app.include_router(posts_router)


"""
Startup by using

uvicorn loginsys.main:app

at backend(Not in loginsys!)
"""
# if __name__== '__main__':
# 	import uvicorn
# 	uvicorn.run('loginsys.main:app', reload=UvicornSettings.USE_RELOADER, log_level=UvicornSettings.LOG_LEVEL, port=UvicornSettings.PORT)