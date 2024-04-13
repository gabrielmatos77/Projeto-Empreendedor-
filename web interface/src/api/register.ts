import { pocketBaseClient } from "../util/pocketbase";

export async function register(user: string, pass: string) {
  const data = {
    "username": user,
    "email": "test@example.com",
    "emailVisibility": true,
    "password": pass,
    "passwordConfirm": pass,
    "name": "test",
    "field": "utmxh144iyx0c6o"
  };

  return await pocketBaseClient.collection('users').create(data);
}
