import { pocketBaseClient } from "../util/pocketbase";

export async function setRejeitos(id: string, rej: string) {
  // example update data
  const data = {
    "rejeito": rej
  };

  return await pocketBaseClient.collection('registro_producao').update(id, data);
}
