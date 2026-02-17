from fastapi import APIRouter, HTTPException
from typing import List
from ..database import products_db
from ..schemas import ProductResponse, ProductCreate

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

@router.get("/", response_model=List[ProductResponse])
async def get_products():
    return products_db

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int):
    product = next((p for p in products_db if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductResponse)
async def create_product(product: ProductCreate):
    new_id = max([p["id"] for p in products_db], default=0) + 1
    new_product = product.dict()
    new_product["id"] = new_id
    products_db.append(new_product)
    return new_product
