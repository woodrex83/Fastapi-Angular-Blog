from enum import unique
from multiprocessing.sharedctypes import Value
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey
from datetime import datetime
from ..db import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(32), unique=True)
    password = Column(String(80))
    # show in Blog sidenav
    linkedin = Column(String(128), nullable=True)
    gitee = Column(String(128), nullable=True)
    tiktok = Column(String(96), nullable=True)
    aboutMe = Column(String, nullable=True)

    db_post_atc = relationship("Post", backref="user_post", lazy='dynamic')
    db_tag_atc = relationship("Category", backref="user_tag", lazy='dynamic')

class Post(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True)
    content = Column(Text)
    title = Column(String(128), unique=True)
    #utcnow = GMT+0
    created_at = Column(DateTime, default=datetime.utcnow)

    uid = Column(Integer, ForeignKey('user.id', ondelete='cascade'), nullable=True)
    cid = Column(Integer, ForeignKey('category.id', ondelete='cascade'), nullable=True)

    def __getitem__(self, field):
        return self.__dict__[field]


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True)
    name = Column(String(32), unique=True)

    db_post = relationship("Post", backref="user_category", lazy='dynamic')
    uid = Column(Integer, ForeignKey('user.id', ondelete='cascade'), nullable=True)

    


