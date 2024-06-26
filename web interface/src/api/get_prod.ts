import { pocketBaseClient } from "../util/pocketbase";

export async function getProducao(maquina: string, date: string) {

  return await pocketBaseClient.collection('registro_producao ').getFullList({
    filter: 'created >= "' + date + ' 00:00:00" && created <= "' + date + ' 23:59:59" && maquina="' + maquina + '"'
  });
}
