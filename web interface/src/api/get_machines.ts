import { pocketBaseClient } from "../util/pocketbase";

export async function getMachines() {
  const stoped = await pocketBaseClient.collection('parada_maquina').getFullList({
    filter: 'fim=""', expand: 'maquina'
  })
  const running = await pocketBaseClient.collection('registro_producao').getFullList({
    filter: 'fim=""', expand: 'maquina'
  })
  let maqs = await pocketBaseClient.collection('maquinas').getFullList({
    sort: '-created',
  });
  running.forEach((e) => {
    maqs = maqs.map((x) => x.id === e.maquina ? e : x)
  })
  stoped.forEach((e) => {
    maqs = maqs.map((x) => x.id === e.maquina ? e : x)
  })
  return maqs
}
