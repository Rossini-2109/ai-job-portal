from flask import Flask
from flask_jwt_extended import JWTManager
from config import init_db
from routes.auth import auth
from routes.jobs import jobs



app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-key'

jwt = JWTManager(app)
init_db(app)

app.register_blueprint(auth, url_prefix='/auth')
@app.route("/")
def home():
    return {"message": "AI Job Portal Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)
