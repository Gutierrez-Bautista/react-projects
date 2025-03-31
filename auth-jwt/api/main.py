from flask import Flask, jsonify, request
from flask_cors import CORS
from jose import jwt, JWTError
from time import time

app = Flask(__name__)

ORIGINS = ['http://127.0.0.1:5173', 'http://localhost:5173']

CORS(app, origins=ORIGINS)

USERS = [
  {
    'name': 'juan',
    'password': '1234',
  },
  {
    'name': 'paco',
    'password': 'abcd',
  }
]

SECRET_KEY = 'fnainidfppaej901j3d-3dn1'

@app.get('/api/all_data')
def get_all ():
  return jsonify(USERS)

@app.post('/api/login')
def login_fn ():
  try:
    reqData = request.get_json()
  except:
    return '"Content-Type" must be "application/json"', 415

  for u in USERS:
    if (reqData['name'] == u['name'] and reqData['password'] == u['password']):
      tokenData = u.copy()
      tokenData['expires'] = time() + 5

      accessToken = jwt.encode(tokenData, SECRET_KEY, "HS256")

      return jsonify({
        'ok': True,
        'user': u,
        'accessToken': accessToken
      })

  return jsonify({
    "ok": False,
    'error': 'userNotFound'
    }), 404

@app.get('/api/refreshToken')
def refresh_token ():
  return None

@app.get('/api/protected')
def protected ():
  auth = request.headers.get('Authorization')

  try:
    # "bearer *token*"
    userToken = auth.split(' ')[1]
  except:
    return jsonify({'error': 'Unauthorized'}), 401

  if userToken is None or userToken == '':
    return jsonify({'error': 'Unauthorized'}), 401

  if not validToken(userToken):
    return jsonify({'error': 'SessionExpired'}), 401

  return jsonify({
    'protected': 'protected information'
  })

def validToken (token, options = {}):
  try:
    decodedToke = jwt.decode(token, SECRET_KEY, 'HS256')
    currentTime = time()

    print(decodedToke, '\n\n', currentTime, '\n', decodedToke['expires'])

    if currentTime > decodedToke['expires']:
      return False

    for u in USERS:
      if u['name'] == decodedToke['name'] and u['password'] == decodedToke['password']:
        return decodedToke if 'get_payload' in options else True

    return False
  except JWTError as error:
    print('Exception: ', error)
    return False

app.run(port=8000, debug=True)