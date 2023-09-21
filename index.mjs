#! /usr/bin/env node

import { printLogo } from "./printer.mjs";
import inquirer from 'inquirer';

(async () => {
    printLogo()

    const { limit } = await inquirer.prompt([
        {
            type: "input",
            message: "How many personnummer do you need?",
            name: "limit"
        }
    ])
    const fetchData = async () => {
        try {

            const offset = Math.floor(Math.random() * 5000);

            const url = `https://skatteverket.entryscape.net/rowstore/dataset/b4de7df7-63c0-4e7e-bb59-1f156a591763?_limit=${limit ? limit : 10}&_offset=${offset}`
            const response = await fetch(url)

            if (!response.ok) {
                console.error("Response from skatteverket: ", response.status)
            }

            const json = await response.json();
            console.log(json.results)
        }
        catch {
            console.error("Something went wrong!")
            return;
        }
        const { more } = await inquirer.prompt([{
            type: "confirm",
            message: "Fetch more personnummer?",
            name: "more"
        }])
        if (!more) {
            return;
        }
        fetchData();
    }
    fetchData();
})()