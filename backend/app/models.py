from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image_url: str

class CartItem(BaseModel):
    product_id: int
    quantity: int
