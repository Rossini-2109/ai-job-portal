from flask import Blueprint

jobs = Blueprint('jobs', __name__)

@jobs.route('/post', methods=['POST'])
def post_job():
    return {"message": "Job posted"}

@jobs.route('/list', methods=['GET'])
def list_jobs():
    return {"jobs": []}
