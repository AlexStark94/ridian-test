from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import random
import datetime
import time

SYMBOLS = ["BTC", "ETH", "XRP", "BCH", "LTC", "ADA", "AVAX", "BNB", "TRX", "DOT"]

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/navs")
async def navs():
    hourly_navs = pd.read_csv('hourly_navs.csv', header=None, index_col=0)
    daily_navs = pd.read_csv('daily_navs.csv', header=None, index_col=0)
    return {"hourly_navs": hourly_navs, "daily_navs": daily_navs}

@app.get("/top_10")
async def top_10():
    return {"top_10": SYMBOLS}

@app.get("/return_{symbol}")
async def return_symbol(symbol):
    time.sleep(1)
    if symbol not in SYMBOLS:
        return {"return": "Symbol not found"}
    mult = {
        "BTC": 0.5,
        "ETH": 0.6,
        "XRP": 0.7,
    }
    return {"return": (random.random()-0.4) * mult.get(symbol, 1) / 2}

@app.post("/place_trade/{symbol}")
async def place_trade(symbol):
    time.sleep(1)
    if symbol not in SYMBOLS:
        return {"return": "Symbol not found"}
    rand = random.random()
    if rand < 0.3:
        raise HTTPException(status_code=404, detail="Trade failed. Too busy. Try again.")
    return {"return": "Trade placed", "price": rand*100, "date": datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "index": SYMBOLS.index(symbol)}
