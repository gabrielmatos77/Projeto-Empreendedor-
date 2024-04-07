import json
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    dados = request.json
    username = dados.get('username')
    status = dados.get('status')
    if username is None or status is None:
        return jsonify({'mensagem': 'Dados incompletos'}), 400
    return jsonify({'username': username, 'status': status}), 200
if __name__ == "__main__":
    app.run(port=5000)
