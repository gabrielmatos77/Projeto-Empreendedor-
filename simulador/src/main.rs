use core::f64;
use rand::prelude::*;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, thread::sleep, time::Duration};

#[derive(Clone)]
struct Machine {
    name: String,
    working: bool,
    qtd: f64,
    exec_id: String,
}

impl Machine {
    fn new(name: String, working: bool, exec: String) -> Machine {
        Machine {
            name,
            working,
            qtd: 0.0,
            exec_id: exec,
        }
    }

    async fn change(mut self) -> Self {
        let rng: f64 = rand::thread_rng().gen();
        let changestate = rng > 0.99;
        match (self.working, changestate) {
            (true, true) => {
                self = self.stop_machine().await;
                self
            }
            (false, true) => {
                self = self.start_machine().await;
                self
            }
            (true, false) => {
                self = self.incremet_qtd();
                self
            }
            _ => self,
        }
    }
    async fn stop_machine(mut self) -> Self {
        //req to stop
        let nowdate = &chrono::Local::now().to_string();
        let thisqtd = &self.qtd.to_string();
        let mut data = HashMap::new();
        data.insert("maquina", &self.name);
        data.insert("fim", nowdate);
        data.insert("qtd_prod", thisqtd);
        let client = reqwest::Client::new();
        let resp = client
            .patch(format!(
                "http://4.228.217.142:8090/api/collections/registro_producao/records/{}",
                self.exec_id
            ))
            .json(&data)
            .send()
            .await;

        self.working = false;
        self.qtd = 0.0;
        return self;
    }
    async fn start_machine(mut self) -> Self {
        //req to start
        let mut data = HashMap::new();
        data.insert("maquina", &self.name);
        let client = reqwest::Client::new();
        let record = client
            .post("http://4.228.217.142:8090/api/collections/registro_producao/records")
            .json(&data)
            .send()
            .await
            .expect("err")
            .json::<ResponseStartMachine>()
            .await
            .ok()
            .unwrap();
        self.exec_id = record.id;
        self.working = true;
        self
    }
    fn incremet_qtd(mut self) -> Self {
        self.qtd = self.qtd + 1.0;
        return self;
    }
    fn plot(self) -> Self {
        println!(
            "maq:{} funcionando:{} qtd: {}",
            self.name, self.working, self.qtd
        );
        self
    }
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Debug)]
struct PocketbaseRequest<T> {
    page: u32,
    perPage: u32,
    totalItems: u32,
    totalPages: u32,
    items: Vec<T>,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Debug)]
struct MachineItens {
    collectionId: String,
    collectionName: String,
    created: String,
    endereco_ip_: String,
    id: String,
    maquina: String,
    status_maquina: bool,
    updated: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Debug)]
struct NowMachineState {
    collectionId: String,
    collectionName: String,
    created: String,
    fim: String,
    id: String,
    maquina: Vec<String>,
    qtd_prod: u32,
    updated: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Debug)]
struct ResponseStartMachine {
    id: String,
    collectionId: String,
    collectionName: String,
    created: String,
    updated: String,
    maquina: Vec<String>,
    fim: String,
    qtd_prod: u32,
}

#[tokio::main]
async fn main() {
    let dt = reqwest::get("http://4.228.217.142:8090/api/collections/maquinas/records")
        .await
        .expect("err")
        .json::<PocketbaseRequest<MachineItens>>()
        .await
        .ok()
        .unwrap();
    let mut maqs: Vec<Machine> = vec![];
    for maq in dt.items {
        let this_exec = reqwest::get(format!("http://4.228.217.142:8090/api/collections/registro_producao/records?filter=(fim=''%26%26maquina.id='{}')",maq.id))
            .await
            .expect("err")
            .json::<PocketbaseRequest<NowMachineState>>()
            .await;

        let (id_exec, tot_itens) = match this_exec {
            Ok(e) => {
                if e.totalItems > 0 {
                    (e.items.first().unwrap().id.to_string(), true)
                } else {
                    ("".to_string(), false)
                }
            }
            Err(_) => ("".to_string(), false),
        };

        maqs.push(Machine::new(maq.id, tot_itens, id_exec));
    }

    loop {
        let mut intmaqs: Vec<Machine> = vec![];
        for maq in maqs {
            intmaqs.push(maq.change().await.plot())
        }
        maqs = intmaqs;
        sleep(Duration::new(10, 0))
    }
}
