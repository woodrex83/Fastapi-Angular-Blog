from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    # May be need to correct it to str only
    token_type: str = "bearer"
