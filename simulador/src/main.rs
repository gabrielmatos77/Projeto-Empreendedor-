use core::f64;
use rand::prelude::*;
use std::{thread::sleep, time::Duration};

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

    fn change(mut self) -> Self {
        let rng: f64 = rand::thread_rng().gen();
        let laststate = self.working;
        if rng > 0.98 {
            self.working = !self.working;
        }
        if self.working && laststate == self.working {
            self.qtd = self.qtd + 1.0
        } else {
            self.qtd = 0.0
        }

        self
    }
    fn plot(self) -> Self {
        println!(
            "maq:{} funcionando:{} qtd: {}",
            self.name, self.working, self.qtd
        );
        self
    }
}

fn main() {
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
            intmaqs.push(maq.change().plot())
        }
        maqs = intmaqs;
        sleep(Duration::new(2, 0))
    }
}
