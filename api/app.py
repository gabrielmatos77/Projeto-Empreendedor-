import json
from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/login', methods=['POST'])
def login():
    return '', 200, {'token': ''}


if __name__ == "__main__":
    app.run(port=5000)
