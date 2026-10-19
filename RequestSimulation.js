import { exec } from "child_process";
import { argv } from "process";

function curl() {
    return new Promise((resolve, reject) => {
        exec('curl http://localhost:8080/r', (err, stdout, stderr) => {
            if (err) {
                console.log(`Error running curl command: ${stderr || err.message}`)
                reject(err)
                return
            }
            resolve(stdout)
        });
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function spam(sleep_ms) {
    let i = 0
    let ccount = 0
    let success_count = 0
    let failure_count = 0

    console.log(`${sleep_ms}ms sleep`)
    console.log("Firing up curl requests")
    while (i < 10) {
        ccount = 0
        while (ccount < 10) {
            let result = await curl();
            console.log(result);
            if (result.includes("GRANTED")) {
                success_count++;
            } else if (result.includes("DENIED")) {
                failure_count++;
            }
            ccount++;
        }
        i++
        await sleep(sleep_ms)
    }
    console.log(`Successful request count: ${success_count}`);
    console.log(`Failed request count: ${failure_count}`);
    
}

spam(argv[2])