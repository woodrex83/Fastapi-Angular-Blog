from typing import List
from unicodedata import category
from urllib.request import Request
from fastapi import APIRouter
from fastapi.param_functions import Depends
from ..db import get_session
from ..db.actions import content_list, create_post, modify_post, create_category, delete_post, content_list, category_content_list
from sqlalchemy.orm import Session

from ..models.posts import PostChange,PostCreate, PostResponse, CategoryCreate, CategoryResponse
from ..db.models import Post, Category
from ..security import manager

router = APIRouter(prefix='/backend')

# Required Login
@router.post('/posts', response_model=PostResponse)
def create(post: PostCreate, user=Depends(manager), db=Depends(get_session)) -> PostResponse:
    post = create_post(
        title=post.title,
        content=post.content,
        cat=post.cat,
        owner=user, 
        db=db
        )
    return PostResponse.from_orm(post)

# Required Login
@router.put('/posts/{postid}')
def modify(post: PostChange, user=Depends(manager), db=Depends(get_session)) -> PostResponse:
    post = modify_post(
        title=post.title,
        content=post.content,
        pid=post.id,
        cat=post.cat,
        owner=user, 
        db=db
        )
    return post

# Required Login
@router.delete('/posts/{postid}')
def modify(postid: str, user=Depends(manager), db=Depends(get_session)) -> PostResponse:
    post = delete_post(
        postid=postid,
        owner=user, 
        db=db
        )
    return post

# Required Login
@router.post('/category', response_model=CategoryResponse)
def create(category: CategoryCreate, user=Depends(manager), db=Depends(get_session)) -> CategoryResponse:
    category = create_category(category.name, user, db)
    return CategoryResponse.from_orm(category)

@router.get('/articleList')
def listing(db: Session = Depends(get_session)):
    postList = db.query(Post).all()
    return postList

@router.get('/categoryList')
def listing(db: Session = Depends(get_session)):
    catList = db.query(Category).all()
    return catList

@router.get('/contentList')
def listing(db: Session = Depends(get_session)):
    postList = content_list(db)
    return postList

@router.get('/tagList/{categoryName}')
def listing(categoryName: str, db: Session = Depends(get_session)):
    postList = category_content_list(categoryName, db)
    return postList

"""
偷懶了，下面的接口前後台混用，數據量大性能會有大問題，有需要自行改造
"""

@router.get('/posts/{postid}')
def detail(postid: str, db: Session = Depends(get_session)):
    post = db.query(Post).filter_by(id=postid).one()
    return post



