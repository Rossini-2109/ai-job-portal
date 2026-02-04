from flask_mysql import MySQL

mysql = MySQL()

def init_db(app):
    app.config['MYSQL_DATABASE_USER'] = 'root'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
    app.config['MYSQL_DATABASE_DB'] = 'ai_job_portal'
    app.config['MYSQL_DATABASE_HOST'] = 'localhost'
    mysql.init_app(app)
