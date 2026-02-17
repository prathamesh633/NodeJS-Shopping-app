from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import products, cart

app = FastAPI(
    title="Shopping App Backend",
    description="Simple backend for a shopping application",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173", # Vite default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(products.router)
app.include_router(cart.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Shopping App API"}
