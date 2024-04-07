import csv
from flask import Flask, jsonify, request

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(port=5000)
