from flask import Blueprint, request
from flask_jwt_extended import create_access_token

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    return {"message": "User registered"}

@auth.route('/login', methods=['POST'])
def login():
    token = create_access_token(identity="user_id")
    return {"access_token": token}
