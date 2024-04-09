use std::{thread::sleep, time::Duration};

#[derive(Clone)]
struct Machine {
    name: String,
    working: bool,
}

impl Machine {
    fn new(name: String) -> Machine {
        Machine {
            name,
            working: false,
        }
    }

    fn plot(mut self) {
        self.working = !self.working
    }
}

fn main() {
    loop {
        let mut machines: Vec<Machine> = vec![];

        for i in 1..5 {
            machines.push(Machine::new(i.to_string()))
        }
        for maq in machines {
            println!("maq:{} funcionando:{}", maq.name, maq.working)
        }
        sleep(Duration::new(2, 0))
    }
}
