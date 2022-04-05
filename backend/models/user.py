from typing import List, Optional
from pydantic import BaseModel

from ..models.posts import PostResponse


class UserCreate(BaseModel):
    username: str
    password: str
    linkedin: Optional[str]
    gitee: Optional[str]
    tiktok: Optional[str]
    aboutMe: Optional[str]


class UserReponse(UserCreate):

    class Config:
        orm_mode = True
