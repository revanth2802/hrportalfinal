from functools import wraps
from flask import Flask, request, jsonify
import json
import logging
from urllib.request import urlopen
from jose import jwt, JWTError
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Set up logging configuration
logging.basicConfig(level=logging.INFO)

# Read Auth0 settings from environment variables
AUTH_DOMAIN = os.environ.get('AUTH0_DOMAIN')  # Auth0 domain
TOKEN_ALGORITHMS = ['RS256']  # Algorithms for token verification
AUDIENCE = os.environ.get('API_AUDIENCE')  # API audience

# Function to retrieve JWKS (JSON Web Key Set) from Auth0
def get_auth_keys():
    keys_url = f'https://{AUTH_DOMAIN}/.well-known/jwks.json'
    try:
        # Open the JWKS URL and parse JSON response
        response = urlopen(keys_url)
        key_data = json.loads(response.read())
        return key_data
    except Exception as err:
        logging.error(f"Error fetching JWKS: {err}")
        return None

# Custom decorator to validate JWT in requests
def jwt_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Extract Authorization header
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            logging.error("Missing Authorization header")
            return jsonify({"error": "Missing Authorization header"}), 401

        # Split Authorization header value
        parts = auth_header.split()
        if parts[0].lower() != 'bearer':
            logging.error("Authorization header must start with 'Bearer'")
            return jsonify({"error": "Authorization header must start with 'Bearer'"}), 401
        elif len(parts) == 1:
            logging.error("Token not provided")
            return jsonify({"error": "Token not provided"}), 401
        elif len(parts) > 2:
            logging.error("Authorization header format is invalid")
            return jsonify({"error": "Authorization header format is invalid"}), 401

        token = parts[1]  # Extract the token

        # Fetch JWKS
        keys = get_auth_keys()
        if not keys:
            return jsonify({"error": "Failed to fetch JWKS"}), 500

        try:
            # Extract token's header without verifying its signature
            header_data = jwt.get_unverified_header(token)
        except JWTError as err:
            logging.error(f"Invalid token header: {err}")
            return jsonify({"error": "Invalid token header"}), 401

        rsa_key = {}
        for key in keys['keys']:
            # Match the key ID (kid) from the header with JWKS keys
            if key['kid'] == header_data.get('kid'):
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
                break
        else:
            logging.error("Matching key ID not found in JWKS")
            return jsonify({"error": "Matching key ID not found in JWKS"}), 401

        try:
            # Decode and verify the JWT
            decoded_token = jwt.decode(
                token,
                rsa_key,
                algorithms=TOKEN_ALGORITHMS,
                audience=AUDIENCE,
                issuer=f'https://{AUTH_DOMAIN}/'
            )
        except JWTError as err:
            logging.error(f"Invalid token: {err}")
            return jsonify({"error": "Invalid token"}), 401
        except Exception as err:
            logging.error(f"Error decoding token: {err}")
            return jsonify({"error": "Error decoding token"}), 500

        return func(*args, **kwargs)  # Proceed to the wrapped function

    return wrapper

# Protected route example
@app.route('/secure-data')
@jwt_required
def secure_data():
    return jsonify({"message": "Access to secure data granted!"})

# Main entry point
if __name__ == '__main__':
    app.run(debug=True)