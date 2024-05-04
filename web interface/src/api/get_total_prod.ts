import { pocketBaseClient } from "../util/pocketbase";

export async function getTotalProd(id: string) {
  const res = await pocketBaseClient.collection('Qtd_prod').getOne(id);
  return res
}
