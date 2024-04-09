import axios from "axios";

export async function login(user: string, pass: string) {
  return await axios.post('http://localhost:5000/login'
    , { username: user, password: pass })
}
