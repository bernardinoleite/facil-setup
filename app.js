import { execSync } from "child_process"
import { mkdirSync, statSync, writeFileSync } from "fs"

const codeAppError = `
export class AppError {
    #message
    #statusCode
    constructor(message, statusCode) {
        this.#message = message;
        this.#statusCode = statusCode;
    }
}
`

const codeServer = `
import express from "express";
import { router } from "./routes/index.js";
import "./../ormConfig.js"

const app = express();

app.use(express.json())

app.use(router)

app.listen(2908, "localhost", () => console.table({ URL: "http://localhost:2908/" }));

`

const codeGitIgnore = `
node_modules
yarn.lock
.env
ormConfig.ts
yarn-error.log
`
const codeEnv = `
TYPEORM_CONNECTION=exemple_postgres
TYPEORM_PORT=exemple_5432
TYPEORM_DATABASE=exemple_nameDB
TYPEORM_HOST=exemple_localhost
TYPEORM_USERNAME=exemple_username
TYPEORM_PASSWORD=exemple_password
TYPEORM_MIGRATIONS=exemple_path_migrations
TYPEORM_ENTITIES=exemple_path_entities
`
const codeTypeorm = `
import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "exemple_postgres",
    host: "exemple_localhost",
    port: exemple_5432,
    username: "exemple_username",
    password: "exemple_password",
    database: "exemple_nameDB",
    entities: ["./src/modules/exempleAccounts/entities/exemple.ts"],
    migrations: ["./src/path/migrations/*.ts"],
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => console.log("data source init"))
`

const codeRouter = `
import { Router } from "express"


const router = Router()


router.get("/", (request, response) => {
    return response.status(200).json({
        message: "Hello World",
        statusCode: 200
    })
})

export {
    router
}


`

class App {

    constructor() {
        this.main()
    }

    async main() {
        this.initializeProject()
        this.createDirs()
        this.createServer()
        this.createGitIgnore()
        this.createOrmConfig()
        this.executeServer()
    }

    initializeProject() {

        const command = `npm init -y && npm pkg set type=module && npm pkg set scripts.dev="node --watch ./src/server.js"`

        execSync(command)
        this.installDependency()
    }
    installDependency() {
        const command = "npm install express"
        execSync(command)
    }
    createDirs() {
        const source = "src"

        mkdirSync(`./${source}`)

        if (statSync("./src")) {
            const dirs = ["utils", "config", "modules", "middlewares", "routes", "database", "error"]
            dirs.forEach(dir => {
                mkdirSync(`${source}/${dir}`)
            })
            this.createSubDirs()

        }
        else {
            return
        }
    }

    createSubDirs() {
        const source = "src"
        const dirs = ["utils", "config", "modules", "middlewares", "routes", "database", "error"]
        dirs.forEach(dir => {
            if (statSync(`${source}/${dir}`)) {
                switch (dir) {
                    case "modules":
                        mkdirSync(`${source}/${dir}/exempleAccounts`)
                        if (statSync(`${source}/${dir}/exempleAccounts`)) {
                            mkdirSync(`${source}/${dir}/exempleAccounts/useCases`)
                            mkdirSync(`${source}/${dir}/exempleAccounts/repositories`)
                            mkdirSync(`${source}/${dir}/exempleAccounts/entities`)
                            mkdirSync(`${source}/${dir}/exempleAccounts/dtos`)
                        }
                        else {
                            return
                        }
                        break;
                    case "database":
                        mkdirSync(`${source}/${dir}/migrations`)
                        break;
                    case "error":
                        writeFileSync(`${source}/${dir}/AppError.js`, codeAppError, "utf8")
                        break;
                    case "routes":
                        writeFileSync(`${source}/${dir}/index.js`, codeRouter, "utf8")
                        break;
                }
            }
        })

    }

    createServer() {
        const source = "src"
        if (statSync(`./${source}`)) {
            writeFileSync(`./${source}/server.js`, codeServer, "utf8")
        }
        else {
            return
        }
    }

    createGitIgnore() {
        writeFileSync(`./.gitignore`, codeGitIgnore, "utf8")
    }
    createOrmConfig() {
        writeFileSync(`./ormConfig.js`, codeTypeorm, "utf8")
    }

    executeServer() {
        execSync("npm run dev")
    }

}


new App()

