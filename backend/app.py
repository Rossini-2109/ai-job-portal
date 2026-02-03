from flask import Flask
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-key'

jwt = JWTManager(app)

@app.route("/")
def home():
    return {"message": "AI Job Portal Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)
