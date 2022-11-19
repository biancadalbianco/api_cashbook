const mysql = require("./mysqlConnect");

get = async (valor) => {
    if(valor==undefined){
        sql= `SELECT * FROM moviment`;
        return await mysql.query(sql);
    }else{
        sql= `SELECT * FROM moviment where year(date) =${valor.year} and month(date) =${valor.month}`;
        return await mysql.query(sql);
    }
}

post= async (date, idUser)=>{
    //console.log(date);
    sql="INSERT INTO moviment"
    +" (description, date, value, user_id, type)"
    +" VALUES "
    +"('"+date.description+"', '"+date.date+"', "+date.value+", "+idUser+", '"+date.type+"')";
    const result = await  mysql.query(sql);
    console.log(result);
    if(result){
        resp={"status":"OK",insertId:result.insertId};
    }else{
        resp={"status":"Error",insertId:result.insertId};
    }
    return resp;
 }

 put= async (date, idUser)=>{
     sql="UPDATE moviments SET "
     +"description='"+date.description+"', date= '"+date.date+"', value="+date.value+", user_id="+idUser+", type='"+date.type+"'" 
     +" WHERE id= "+date.id
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 remove = async (idMov, idUser)=>{
    sql="DELETE INTO moviments"
    +" WHERE id="+idMov;
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
}

cashBalance = async() => {
    entrada = `SELECT sum(value) AS input FROM moviment WHERE type='input'`;
    saida = `SELECT sum(value) AS output FROM moviment WHERE type='output'`;
    entradaSQL = await mysql.query(entrada);
    saidaSQL = await mysql.query(saida);
    entradaValor = entradaSQL[0].input
    saidaValor = saidaSQL[0].output
    saldo = entradaValor-saidaValor;
    var valores = {
        saldo:saldo,
        entrada:entradaValor,
        saida:saidaValor,
    }
    return valores;
}

Io = async() => {
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output') AS output FROM moviment m`;
    valores = await mysql.query(sql);
    return valores;
}

IoFiltrado = async(valor) => {
    var data = new Date();
    dia = String(data.getDate()).padStart(2,'0');
    mes = String(data.getMonth()+1).padStart(2,'0');
    ano = data.getFullYear();
    dataHoje = "'"+ano+"-"+mes+"-"+dia+"'";
    dataFiltro = "'"+valor.year+"-"+valor.month+"-0'";
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output') AS output FROM moviment m where date between ${dataFiltro} and ${dataHoje}`;
    valores = await mysql.query(sql);
    return valores;
}

IoFiltradoDuasDatas = async(valor) => {
    data1 = "'"+valor.year+"-"+valor.month+"-0'";
    data2 = "'"+valor.year2+"-"+valor.month2+"-0'";
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output') AS output FROM moviment m where date between ${data1} and ${data2}`;
    valores = await mysql.query(sql);
    return valores;
}


module.exports= {get,post, put, remove, cashBalance, Io, IoFiltrado, IoFiltradoDuasDatas}