import yfinance as yf
from django.http import JsonResponse

def analyze_stock(request, symbol):
    try:
        # Append .NS for NSE stocks
        ticker = yf.Ticker(f"{symbol}.NS")
        df = ticker.history(period="5d")

        if df.empty or "Close" not in df.columns:
            return JsonResponse({"error": f"No data found for {symbol}"}, status=404)

        latest_price = df["Close"].iloc[-1]
        average_price = df["Close"].mean()

        suggestion = "Buy" if latest_price < average_price else "Hold"

        return JsonResponse({
            "symbol": symbol,
            "latest_price": round(latest_price, 2),
            "average_price": round(average_price, 2),
            "suggestion": suggestion
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
def get_nifty(request):
    ticker = yf.Ticker("^NSEI")  # NIFTY 50
    data = ticker.history(period="1d")
    latest_price = data["Close"].iloc[-1]
    return JsonResponse({
        "index": "NIFTY 50",
        "latest_price": round(latest_price, 2)
    })

def get_sensex(request):
    ticker = yf.Ticker("^BSESN")  # Sensex
    data = ticker.history(period="1d")
    latest_price = data["Close"].iloc[-1]
    return JsonResponse({
        "index": "SENSEX",
        "latest_price": round(latest_price, 2)
    })

def get_banknifty(request):
    ticker = yf.Ticker("^NSEBANK")  # Bank NIFTY
    data = ticker.history(period="1d")
    latest_price = data["Close"].iloc[-1]
    return JsonResponse({
        "index": "BANK NIFTY",
        "latest_price": round(latest_price, 2)
    })
