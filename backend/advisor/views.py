import json, time, requests, yfinance as yf
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login as django_login
from django.contrib.auth.hashers import make_password

User = get_user_model()

# ---------------- STOCK ANALYSIS ---------------- #

def analyze_stock(request, symbol):
    try:
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


# ---------------- MARKET DATA ---------------- #

market_cache = {}
CACHE_DURATION = 600  # 10 minutes

def get_market_data(symbol, name):
    current_time = time.time()

    if symbol in market_cache:
        cached_data = market_cache[symbol]
        if current_time - cached_data['timestamp'] < CACHE_DURATION:
            latest_price = cached_data['price']
            change = cached_data.get('change', 0.0)
            percent_change = cached_data.get('percent', 0.0)
            return {
                "name": name,
                "value": f"{latest_price:,.2f}",
                "change": f"{'+' if change >= 0 else ''}{change:,.2f}",
                "percent": f"{'+' if percent_change >= 0 else ''}{percent_change}%"
            }

    try:
        ticker = yf.Ticker(symbol)
        data = ticker.history(period="2d")

        if data.empty or "Close" not in data.columns:
            raise ValueError("No data found")

        latest_price = round(data["Close"].iloc[-1], 2)

        if len(data) >= 2:
            prev_close = data["Close"].iloc[-2]
            change = round(latest_price - prev_close, 2)
            percent_change = round((change / prev_close) * 100, 2)
        else:
            prev_close = latest_price
            change = 0.0
            percent_change = 0.0
            try:
                info = ticker.info
                if 'previousClose' in info and info['previousClose']:
                    prev_close = info['previousClose']
                    change = round(latest_price - prev_close, 2)
                    percent_change = round((change / prev_close) * 100, 2)
            except:
                pass

        market_cache[symbol] = {
            'price': latest_price,
            'change': change,
            'percent': percent_change,
            'timestamp': current_time
        }

    except Exception:
        if symbol in market_cache:
            cached = market_cache[symbol]
            latest_price = cached['price']
            change = cached.get('change', 0.0)
            percent_change = cached.get('percent', 0.0)
        else:
            latest_price = 24000.00 if "NSEI" in symbol else 79000.00 if "BSESN" in symbol else 51000.00
            change = 0.0
            percent_change = 0.0

    return {
        "name": name,
        "value": f"{latest_price:,.2f}",
        "change": f"{'+' if change >= 0 else ''}{change:,.2f}",
        "percent": f"{'+' if percent_change >= 0 else ''}{percent_change}%"
    }

def get_market_status(request):
    indices = [
        {"symbol": "^NSEI", "name": "NIFTY 50"},
        {"symbol": "^BSESN", "name": "SENSEX"},
        {"symbol": "^NSEBANK", "name": "BANK NIFTY"},
        {"symbol": "^CNXIT", "name": "NIFTY IT"},
        {"symbol": "^IXIC", "name": "NASDAQ"},
        {"symbol": "^GSPC", "name": "S&P 500"},
        {"symbol": "GC=F", "name": "GOLD"},
        {"symbol": "INR=X", "name": "USD/INR"},
    ]
    results = [get_market_data(i["symbol"], i["name"]) for i in indices]
    return JsonResponse(results, safe=False)

def get_nifty(request):
    return JsonResponse(get_market_data("^NSEI", "NIFTY 50"))

def get_sensex(request):
    return JsonResponse(get_market_data("^BSESN", "SENSEX"))

def get_banknifty(request):
    return JsonResponse(get_market_data("^NSEBANK", "BANK NIFTY"))

def search_stock(request):
    symbol = request.GET.get('symbol')
    if not symbol:
        return JsonResponse({"error": "Symbol parameter is required"}, status=400)

    if not symbol.endswith('.NS') and not symbol.endswith('.BO') and not symbol.startswith('^'):
        symbol = f"{symbol}.NS"

    try:
        if symbol in market_cache:
            cached_data = market_cache[symbol]
            if time.time() - cached_data['timestamp'] < CACHE_DURATION:
                return JsonResponse({
                    "symbol": symbol,
                    "name": cached_data.get('name', symbol),
                    "price": cached_data['price'],
                    "change_percent": cached_data.get('change_percent', 0.0),
                    "volume": cached_data.get('volume', "N/A"),
                    "suggestion": cached_data.get('suggestion', "Hold")
                })

        ticker = yf.Ticker(symbol)
        data = ticker.history(period="5d")

        if data.empty:
            return JsonResponse({"error": "Stock not found"}, status=404)

        latest_price = round(data["Close"].iloc[-1], 2)
        average_price = data["Close"].mean()
        suggestion = "Buy" if latest_price < average_price else "Hold"

        info = ticker.info
        name = info.get('longName', symbol)
        previous_close = info.get('previousClose', latest_price)
        change = round(((latest_price - previous_close) / previous_close) * 100, 2)
        volume = info.get('volume', 0)

        market_cache[symbol] = {
            'price': latest_price,
            'timestamp': time.time(),
            'name': name,
            'change_percent': change,
            'volume': volume,
            'suggestion': suggestion
        }

        return JsonResponse({
            "symbol": symbol,
            "name": name,
            "price": latest_price,
            "change_percent": change,
            "volume": volume,
            "suggestion": suggestion
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ---------------- AUTHENTICATION ---------------- #
@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")

        if User.objects.filter(email=email).exists():
            return JsonResponse({"success": False, "error": "Email already registered"})

        user = User.objects.create(
            username=email.split("@")[0],   # keep consistent username
            email=email,
            first_name=name,
            password=make_password(password)  # hash the password
        )
        return JsonResponse({"success": True, "user": {"email": user.email, "name": user.first_name}})
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        try:
            # fetch user by email first
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
        except User.DoesNotExist:
            return JsonResponse({"success": False, "error": "Invalid credentials"})

        if user:
            django_login(request, user)
            return JsonResponse({"success": True, "user": {"email": user.email, "name": user.first_name}})
        return JsonResponse({"success": False, "error": "Invalid credentials"})
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def google_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            access_token = data.get('access_token')

            if not access_token:
                return JsonResponse({'error': 'No access_token provided'}, status=400)

            response = requests.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                headers={'Authorization': f'Bearer {access_token}'}
            )

            if response.status_code != 200:
                return JsonResponse({'error': 'Failed to fetch user info from Google'}, status=400)

            user_info = response.json()
            email = user_info.get('email')
            name = user_info.get('name', email.split('@')[0] if email else 'Google User')

            if not email:
                return JsonResponse({'error': 'No email returned from Google'}, status=400)

            # Create or fetch user in DB
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": name,
                }
            )

            # Log the user in (creates session)
            django_login(request, user)

            return JsonResponse({
                'success': True,
                'user': {
                    'email': user.email,
                    'name': user.first_name or user.username
                }
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)