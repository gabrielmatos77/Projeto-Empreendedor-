import { pocketBaseClient } from "../util/pocketbase";

export async function registerMachine(name: string, ip: string) {

  const data = {
    "maquina": name,
    "endereco_ip_": ip,
    "status_maquina": true
  };

  return await pocketBaseClient.collection('maquinas').create(data);
}
