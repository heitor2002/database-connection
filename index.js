const express = require("express");
const mysql = require("mysql");
const app = express();

const port = 5000;

app.use(express.json())

//      CONECTAR AO BANCO DE DADOS

const pool = mysql.createPool({
  connectionLimit   : 10,
  host              : "localhost",
  user              : "root",                   //  User de acesso do admin
  password          : "",                       //  Senha de acesso do admin
  database          : "projeto_arquitetura",    //  Nome do banco de dados utilizado
});

//      UTILIZANDO GET PARA OBTER DADOS

app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("SELECT * from (NOME_DA_TABELA)", (err, rows) => { //Alterar nome da tabela
      connection.release();
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
      }
    });
  });
});

//      UTILIZANDO POST PARA ADICIONAR DADOS

app.post("/", (req, res) => {
    const params = req.body;
    pool.getConnection((err, connection) => {
      if (err) throw err;
  
      connection.query("INSERT INTO (NOME_DA_TABELA) SET ?", params, (err, rows) => { //Alterar nome da tabela
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          res.send(err);
        }
      });
    });
});

//      UTILIZANDO DELETE PARA DELETAR DADOS POR ID

app.delete("/:id", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "DELETE from (NOME_DA_TABELA) WHERE id = ?",
        [req.params.id],
        (err, rows) => {
          connection.release();
          if (!err) {
            res.send(`Cliente ID: ${[req.params.id]} foi removido com sucesso!`);
          } else {
            res.send(`Cliente ID: ${[req.params.id]} não foi removido!`);
          }
        }
      );
    });
});

//      UTILIZANDO PUT PARA ALTERAR DADOS POR ID

app.put("/", (req, res) => {
    const { id } = req.body; // Todos os dados da tabela que estão sendo obtidos. Ex: {id, name, email, password}
    pool.getConnection((err, connection) => {
      if (err) throw err;
  
      connection.query(
        "UPDATE (NOME_DA_TABELA) SET `(INFORMAÇÃO QUE ESTÁ SENDO ALTERADA)` = ? WHERE id =?",   //Alterar nome da tabela e adicionar elementos que estão sendo alterados, separando-os por vírgula.
        [/* INFORMAÇÃO QUE ESTÁ SENDO ALTERADA */, id],
        (err, rows) => {
          connection.release();
          if (!err) {
            res.send(rows);
          } else {
            res.send(err);
          }
        }
      );
    });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
