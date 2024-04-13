import { pocketBaseClient } from "../util/pocketbase";

export async function login(user: string, pass: string) {


  return await pocketBaseClient.collection('users').authWithPassword(
    user,
    pass,
  );

}
