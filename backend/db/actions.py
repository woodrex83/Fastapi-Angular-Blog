from datetime import datetime
from typing import Callable, Iterator, Optional
from unicodedata import name
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..db import get_session
from ..db.models import Post, User, Category
from ..security import hash_password, manager


@manager.user_loader(session_provider=get_session)
def get_user_by_name(
    name: str,
    db: Optional[Session] = None,
    session_provider: Callable[[], Iterator[Session]] = None
) -> Optional[User]:
    """
    Queries the database for a user with the given name

    Args:
        name: The name of the user
        db: The currently active database session
        session_provider: Optional method to retrieve a session if db is None (provided by our LoginManager)

    Returns:
        The user object or none
    """

    if db is None and session_provider is None:
        raise ValueError("db and session_provider cannot both be None.")

    if db is None:
        db = next(session_provider())

    user = db.query(User).where(User.username == name).first()
    return user


def create_user(name: str, password: str, linkedin: Optional[str], gitee: Optional[str], tiktok: Optional[str], db: Session) -> User:
    """
    Creates and commits a new user object to the database

    Args:
        name: The name of the user
        password: The plaintext password
        db: The active db session
        linkedin: can be null
        gitee: can be null
        tiktok: can be null

    Returns:
        The newly created user.
    """
    hashed_pw = hash_password(password)
    user = User(username=name, 
                password=hashed_pw, 
                linkedin=linkedin, 
                gitee=gitee,
                tiktok=tiktok,
                aboutMe='')
    db.add(user)
    db.commit()
    return user


def create_post(title: str, 
                content: str, 
                owner: User,
                cat: Category, 
                db: Session) -> Post:
    catid = db.query(Category).filter_by(name=cat,id=Category.id).one()            
    post = Post(title=title,
                content=content,
                uid=owner.id,
                cid=catid.id)
    db.add(post)
    db.commit()
    return post


def create_category(name: str, 
                    owner: User, 
                    db: Session) -> Post:
    category = Category(name=name,uid=owner.id)
    db.add(category)
    db.commit()
    return category

def modify_post(title: str, 
                content: str,
                pid: Post, 
                owner: User,
                cat: Category, 
                db: Session) -> Post:
    catid = db.query(Category).filter_by(name=cat,id=Category.id).one()            
    post = {'title':title,
            'content':content,
            'id': pid,
            'uid':owner.id,
            'cid':catid.id,
            'created_at': datetime.utcnow()}
    db.query(Post).filter(Post.id == pid).update(post)
    db.commit()
    return post

def delete_post(postid: str, owner: User, db: Session):
    post = db.query(Post).filter_by(id=postid).delete()
    db.commit()
    return post

def content_list(db: Session):
    postList = db.query(Post).all()
    contentList = []

    for post in postList:
        categoryId = post['cid']
        category = db.query(Category).filter_by(id=categoryId).one()
        post = {'title':post.title,
                'content':post.content,
                'id': post.id,
                'categoryName': category.name,
                'created_at': post.created_at}
        contentList.append(post)
    return contentList

def category_content_list(categoryName, db):
    category = db.query(Category).filter_by(name=categoryName).one()
    postList = db.query(Post).filter_by(cid=category.id).all()
    return postList