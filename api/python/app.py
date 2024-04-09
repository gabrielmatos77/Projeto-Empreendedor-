import csv
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=['POST'])
def login():
    dados = request.json
    username = dados.get('username')
    password = dados.get('password')
    if not username or not password:
        return jsonify({'mensagem': 'Nome de usuário e senha são obrigatórios'}), 400

    with open('usuarios.csv', mode='r', newline='') as arquivo_csv:
        leitor_csv = csv.DictReader(arquivo_csv)
        for linha in leitor_csv:
            if linha['username'] == username and linha['password'] == password:
                return jsonify({'mensagem': 'Login bem-sucedido', 'username': username, 'status': linha['status']}), 200

    return jsonify({'mensagem': 'Credenciais inválidas'}), 401


@app.route('/register', methods=['POST'])
def register():
    dados = request.json
    username = dados.get('username')
    password = dados.get('password')
    status = dados.get('status')

    if not username or not password:
        return jsonify({'mensagem': 'Nome de usuário e senha são obrigatórios'}), 400

    with open('usuarios.csv', mode='r', newline='') as arquivo_csv:
        leitor_csv = csv.DictReader(arquivo_csv)
        for linha in leitor_csv:
            if linha['username'] == username:
                return jsonify({'mensagem': 'Usuário já cadastrado'}), 400

    with open('usuarios.csv', mode='a', newline='') as arquivo_csv:
        escritor_csv = csv.writer(arquivo_csv)
        escritor_csv.writerow([username, password, status])

    return jsonify({'mensagem': 'Usuário cadastrado com sucesso'}), 201


if __name__ == "__main__":
    app.run(port=5000)
