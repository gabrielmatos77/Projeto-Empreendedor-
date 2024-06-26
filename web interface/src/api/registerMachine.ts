import { pocketBaseClient } from "../util/pocketbase";

export async function registerMachine(name: string, ip: string, perid: string, meta: string) {

  const data = {
    "maquina": name,
    "endereco_ip_": ip,
    "status_maquina": true,
    "meta_diaria": meta,
    "peridiocidade": perid
  };

  const maq = await pocketBaseClient.collection('maquinas').create(data);
  const dataparada = {
    "tipo_par": "ausencia_operador",
    "maquina": maq.id
  };
  const record = await pocketBaseClient.collection('parada_maquina').create(dataparada);
  return record
}
