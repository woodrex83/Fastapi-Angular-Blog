from fastapi import APIRouter, Depends
from sqlalchemy.exc import IntegrityError

from ..db import get_session
from ..exceptions import UsernameAlreadyTaken, InvalidUserName, InvalidPermissions
from ..models.user import UserCreate, UserReponse
from ..db.actions import create_user, get_user_by_name
from ..security import manager


router = APIRouter(
    prefix=""
)


@router.post('/register', response_model=UserReponse, status_code=201)
async def register(user: UserCreate, db=Depends(get_session)) -> UserReponse:
    """
    Registers a new user
    """
    try:
        user = await create_user(user.username, user.password, user.linkedin, user.gitee, user.tiktok, db)
        return UserReponse.from_orm(user)
    except IntegrityError:
        raise UsernameAlreadyTaken
    except Exception as e:
        raise e


@router.get('/profile/{username}')
def read_user(username, active_user=Depends(manager), db=Depends(get_session)):
    """
    Shows information about the user
    """
    user = get_user_by_name(username, db)

    if user is None:
        raise InvalidUserName

    # Only allow admins and oneself to access this information
    if user.username != active_user.username:
        raise InvalidPermissions
    
    user = {
        'linkedin': user.linkedin,
        'gitee': user.gitee,
        'tiktok': user.tiktok,
        'aboutMe': user.aboutMe
    }

    return user
