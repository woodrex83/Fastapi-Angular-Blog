from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException
from sqlalchemy.orm import Session

from ..db import get_session
from ..db.actions import get_user_by_name
from ..models.user import UserCreate
from ..models.auth import Token
from ..security import verify_password, manager


router = APIRouter(
    prefix="/auth"
)



@router.post('/login', response_model=Token)
def login(form_data: UserCreate, db: Session = Depends(get_session)) -> Token:
    """
    Logs in the user provided by form_data.username and form_data.password
    """
    try:
        user = get_user_by_name(form_data.username, db)
        if user is None:
            raise InvalidCredentialsException

        if not verify_password(form_data.password, user.password):
            raise InvalidCredentialsException

        token = manager.create_access_token(data={'sub': user.username})
        return Token(access_token=token, token_type='bearer')
    except Exception as e:
        raise e
