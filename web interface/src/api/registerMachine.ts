import { pocketBaseClient } from "../util/pocketbase";

export async function registerMachine(name: string, ip: string, perid: string, meta: string) {

  const data = {
    "maquina": name,
    "endereco_ip_": ip,
    "status_maquina": true,
    "meta_diaria": meta,
    "peridiocidade": perid
  };

  return await pocketBaseClient.collection('maquinas').create(data);
}
