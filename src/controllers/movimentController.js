const movimentoModel = require("../models/movimentModel");

exports.post = async (data, idUser) => {
    return await movimentoModel.post(data, idUser);
};

exports.get = async () => {
    return await movimentoModel.get();
};

exports.put = async (req, res) => {
    return await movimentoModel.put(data, idUser);
};

exports.delete = async (id) => {
    return await movimentoModel.delete(id, idUser);
};

exports.cashbalance = async () => {
    return await movimentoModel.cashBalance();
};

exports.Io = async () => {
    return await movimentoModel.Io();
};

exports.IoFiltrado = async (valor) => {
    return await movimentoModel.IoFiltrado(valor);
};

exports.IoFiltradoDuasDatas = async (valor) => {
    return await movimentoModel.IoFiltradoDuasDatas(valor);
};

exports.MovimentsAnoMes = async (valor) => {
    return await movimentoModel.get(valor);
};
