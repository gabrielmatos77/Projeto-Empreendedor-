import { pocketBaseClient } from "../util/pocketbase";

export async function getMachines() {
  return await pocketBaseClient.collection('maquinas').getFullList({
    sort: '-created',
  });
}
