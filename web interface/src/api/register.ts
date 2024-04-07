import axios from "axios";

export async function register(user: string, pass: string) {
  return await axios.post('http://localhost:5000/register'
    , { user, pass })
}
