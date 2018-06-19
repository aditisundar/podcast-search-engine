# FLASK_APP=server.py FLASK_DEBUG=1 python -m flask run
from flask import Flask, render_template, Response
import json
from json import dumps as stringify
from flask_cors import CORS, cross_origin
import utilities
import requests

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "home"


@app.route("/toplist")
def get_top():
    return utilities.get_top_list()


@app.route("/mysubs/user=<u>/pass=<p>/device=<d>/genre=<genre>/sorted=<sort>")
def get_filtered_subs(u, p, d, genre, sort):
    return utilities.filter_subs_by_genre(u, p, d, genre, int(sort))


@app.route("/mysugs/user=<u>/pass=<p>/device=<d>/genre=all/sorted=0")
def get_sugs(u, p, d):
    return utilities.get_suggestions(u, p, d)


@app.route("/topgenres")
def get_top_genres():
    return utilities.get_top_genres()


@app.route("/search/<query>/genre=<genre>/sorted=<sort>")
def search_by_genre(query, genre, sort):
    return utilities.search_podcasts_by_genre(query, genre, 15, int(sort))


if __name__ == "__main__":
    app.run(threaded=True)
