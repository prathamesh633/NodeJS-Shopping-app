from fastapi import APIRouter, HTTPException
from typing import List
from ..database import cart_db, products_db
from ..schemas import CartItemResponse, CartItemCreate

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)

@router.get("/", response_model=List[CartItemResponse])
async def get_cart():
    # Enrich cart items with product details
    enriched_cart = []
    for item in cart_db:
        product = next((p for p in products_db if p["id"] == item["product_id"]), None)
        if product:
            enriched_item = item.copy()
            enriched_item["product_name"] = product["name"]
            enriched_item["price"] = product["price"]
            enriched_item["total_price"] = product["price"] * item["quantity"]
            enriched_cart.append(enriched_item)
    return enriched_cart

@router.post("/", response_model=CartItemResponse)
async def add_to_cart(cart_item: CartItemCreate):
    # Check if product exists
    product = next((p for p in products_db if p["id"] == cart_item.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Check if item already in cart
    existing_item = next((item for item in cart_db if item["product_id"] == cart_item.product_id), None)
    
    if existing_item:
        existing_item["quantity"] += cart_item.quantity
        item_to_return = existing_item
    else:
        new_item = cart_item.dict()
        cart_db.append(new_item)
        item_to_return = new_item
        
    # Prepare response
    response_item = item_to_return.copy()
    response_item["product_name"] = product["name"]
    response_item["price"] = product["price"]
    response_item["total_price"] = product["price"] * response_item["quantity"]
    
    return response_item

@router.delete("/{product_id}")
async def remove_from_cart(product_id: int):
    global cart_db
    cart_db = [item for item in cart_db if item["product_id"] != product_id]
    return {"message": "Item removed from cart"}
