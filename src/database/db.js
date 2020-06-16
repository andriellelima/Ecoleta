// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utlizar os objetos do BD para as operações
 db.serialize( () => {
//     //criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name  TEXT,
//             address  TEXT,
//             address2  TEXT,
//             state  TEXT,
//             city  TEXT,
//             items  TEXT
//         );
//     `)
//     //inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?); `

//         const values = [
//                 "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//                 "UniReciclagem",
//                 "Guilherme Gemballa, Jardim América",
//                 "Número 260",
//                 "Rio Branco",
//                 "Acre",
//                 "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//    db.run(query, values, afterInsertData)

//     //consultar os dados da tabela 

//     // db.all(`SELECT * FROM places`, function(err, rows){
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão os registros: ")
//     //     console.log(rows)
//     // })

    // //Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("registro deletado com sucesso!")
    // })

 })