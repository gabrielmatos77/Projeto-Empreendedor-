use core::f64;
use rand::prelude::*;
use std::{collections::HashMap, thread::sleep, time::Duration};

#[derive(Clone, Copy)]
struct Machine {
    name: &'static str,
    working: bool,
    qtd: f64,
}

impl Machine {
    fn new(name: &'static str) -> Machine {
        Machine {
            name,
            working: rand::random(),
            qtd: 0.0,
        }
    }

    async fn change(self) -> Self {
        let rng: f64 = rand::thread_rng().gen();
        let changestate = rng > 0.48;
        match (self.working, changestate) {
            (true, true) => {
                self.stop_machine().await;
                self
            }
            (false, true) => {
                self.start_machine().await;
                self
            }
            (true, false) => {
                self.incremet_qtd();
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
        data.insert("maquina", self.name);
        data.insert("fim", nowdate);
        data.insert("qtd_prod", thisqtd);
        let client = reqwest::Client::new();
        let resp = client
            .post("http://4.228.217.142:8090/api/collections/registro_producao/records")
            .json(&data)
            .send()
            .await;

        println!("{resp:#?}");
        self.working = false;
        self.qtd = 0.0;
        return self;
    }
    async fn start_machine(mut self) -> Self {
        //req to start
        let mut data = HashMap::new();
        data.insert("maquina", self.name);
        let client = reqwest::Client::new();
        let _ = client
            .post("http://4.228.217.142:8090/api/collections/registro_producao/records")
            .json(&data)
            .send()
            .await;
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

#[tokio::main]
async fn main() {
    let names = vec![
        "0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "0010", "0011",
        "0012", "0013", "0014", "0015",
    ];
    let mut maqs: Vec<Machine> = vec![];
    for i in 1..15 {
        maqs.push(Machine::new(names[i]))
    }
    loop {
        let mut intmaqs: Vec<Machine> = vec![];
        for maq in maqs {
            intmaqs.push(maq.change().await.plot())
        }
        maqs = intmaqs;
        sleep(Duration::new(20, 0))
    }
}
