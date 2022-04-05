import datetime
from typing import Dict, Optional, List
from pydantic import BaseModel


class PostCreate(BaseModel):
    title: str
    content: str
    cat: str

class CategoryCreate(BaseModel):
    name: str

class PostChange(BaseModel):
    title: str
    content: str
    cat: str
    id: str


class PostResponse(BaseModel):

    created_at: datetime.datetime

    class Config:
        orm_mode = True

class CategoryResponse(BaseModel):

    class Config:
        orm_mode = True
