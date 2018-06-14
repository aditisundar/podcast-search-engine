# FLASK_APP=server.py FLASK_DEBUG=1 python -m flask run
from flask import Flask, render_template
import json
from json import dumps as stringify
from flask_cors import CORS, cross_origin
import utilities

app = Flask(__name__)
CORS(app)

logged_in = False


@app.route("/")
def index():
    return "home"


@app.route("/login/<username>/<password>/<id>")
def login(username, password, id):
    global logged_in
    utilities.login(username, password, id)
    logged_in = True
    return "logged in"


@app.route("/logout")
def logout():
    global logged_in
    utilities.logout
    logged_in = False
    return "logged out"


@app.route("/toplist")
def get_top():
    return utilities.get_top_list()


@app.route("/mysubs/genre=<genre>/sorted=<sort>")
def get_filtered_subs(genre, sort):
    if(logged_in):
        return utilities.filter_subs_by_genre(genre, int(sort))
    return "User not logged in!"


@app.route("/mysugs")
def get_sugs():
    return utilities.get_suggestions()


@app.route("/topgenres")
def get_top_genres():
    return utilities.get_top_genres()


@app.route("/search/<query>/genre=<genre>/sorted=<sort>")
def search_by_genre(query, genre, sort):
    return utilities.search_podcasts_by_genre(query, genre, int(sort))


if __name__ == "__main__":
    app.run()
