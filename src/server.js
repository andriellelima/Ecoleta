const express = require("express")
const server = express()

//acessar banco de dados
const db =require("./database/db.js")
//configurar pasta publica
server.use(express.static("public"))

//habilitar uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos para a aplicação
//pagina Inicial
server.get("/", (req,res)=>{
   return res.render("index.html", {title:"Seu marketplace de coleta de resíduos"}) //deixar a page dinâmica colocando {{title}} no html

})
//pontos de coleta
server.get("/ponto-de-coleta", (req, res) => {

   //req.query: Query Strings da url
   req.query

   return res.render("create-point.html")
})

server.post("/salvar-ponto", (req, res) => {

   // req.body: O corpo do nosso formulário
   // console.log(req.body)

   // inserir dados no banco de dados
   const query = `
       INSERT INTO places (
           image,
           name,
           address,
           address2,
           state,
           city,
           items
       ) VALUES (?,?,?,?,?,?,?);
   `

   const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
   ]

   function afterInsertData(err) {
       if(err) {
           console.log(err)
           return res.send("Erro no cadastro!")
       }

       console.log("Cadastrado com sucesso")
       console.log(this)

       return res.render("create-point.html", {saved: true})
   }

   db.run(query, values, afterInsertData)

})
//pesquisa ponto de coleta
server.get("/resultados-pesquisa", (req,res) => {
   const search = req.query.search
   
   if(search == ""){
      //pesquisa vazia
      return res.render("search-results.html", {total:0})

   }
   
   //consultar os dados da tabela 
     db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' OR state LIKE  '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
       
        const total = rows.length
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places:rows, total:total } )
    })
   
}) 

//ligar o servidor
server.listen(3003)