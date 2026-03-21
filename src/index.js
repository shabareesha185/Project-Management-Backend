import dotenv from "dotenv"
dotenv.config({
    path: "./.env",
})
console.log("New project BackEnd");
console.log(`${process.env.NAME} : ${process.env.DATABASE}`);
