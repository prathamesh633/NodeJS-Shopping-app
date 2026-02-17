from typing import List, Dict
from .models import Product, CartItem

# In-memory database
products_db: List[Dict] = [
    {
        "id": 1,
        "name": "iPhone 14 Pro",
        "description": "Latest Apple iPhone with Dynamic Island.",
        "price": 999.00,
        "image_url": "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=500&q=60"
    },
    {
        "id": 2,
        "name": "MacBook Air M2",
        "description": "Supercharged by M2 chip. Incredibly thin and light.",
        "price": 1199.00,
        "image_url": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=60"
    },
    {
        "id": 3,
        "name": "Sony WH-1000XM5",
        "description": "Industry leading noise canceling headphones.",
        "price": 348.00,
        "image_url": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=60"
    },
    {
        "id": 4,
        "name": "Nike Air Jordan 1",
        "description": "Classic high-top sneakers in red and white.",
        "price": 180.00,
        "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=60"
    },
    {
        "id": 5,
        "name": "Apple Watch Series 8",
        "description": "Advanced health sensors and apps.",
        "price": 399.00,
        "image_url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=60"
    }
]

cart_db: List[Dict] = []
