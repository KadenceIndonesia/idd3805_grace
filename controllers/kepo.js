const mongoose = require("mongoose");
const Task = require("../models/task");
const axios = require("axios");
const pid = process.env.PID;
const moment = require("moment");
require("../library/index");

const kota = [
  { label: "Jakarta", code: 21 },
  { label: "Bandung", code: 22 },
  { label: "Semarang", code: 23 },
  { label: "Jogjakarta", code: 24 },
  { label: "Surabaya", code: 25 },
  { label: "Medan", code: 26 },
  { label: "Pontianak", code: 27 },
  { label: "Makassar", code: 28 },
  { label: "Denpasar", code: 29 },
  { label: "Manado", code: 30 },
  { label: "Balikpapan", code: 31 },
];

exports.coreEvidence = async function (req, res) {
  const login = req.session.data;
  const data = [];
  res.render("EvidenceList/core", {
    data: data,
    login: login,
  });
};

exports.nonCoreEvidence = async function (req, res) {
  const login = req.session.data;
  const data = [];
  res.render("EvidenceList/noncore", {
    data: data,
    login: login,
  });
};

exports.renewalEvidence = async function (req, res) {
  const login = req.session.data;
  const data = [];
  res.render("EvidenceList/renewal", {
    data: data,
    login: login,
  });
};

exports.autocilinEvidence = async function (req, res) {
  const login = req.session.data;
  const kepo = await getAllEvd(18);
  const data = [];
  for (let i = 0; i < kepo.length; i++) {
    var code = kepo[i].code;
    var type = code.substring(0, 2);
    var product = code.substring(4, 6);
    if (parseInt(type) === 10 && (parseInt(product) === 11 || parseInt(product) === 12)) {
      var task = kepo[i].task;
      var branch = task.split("_");
      var cityCode = code.substring(2, 4);
      var getIndexCity = await findObj(kota, "code", parseInt(cityCode));
      var city = kota[getIndexCity].label
      data.push({
        id: kepo[i].id,
        city: city,
        datems: kepo[i].uploadtime,
        branch: branch[0],
      });
    }
  }
  res.render("EvidenceList/autocilin", {
    data: data,
    login: login,
    kota: kota
  });
};

exports.autocilinEvidenceDetail = async function (req, res) {
  const id = req.params.id;
  const login = req.session.data;
  var data = await getEvdById(id);
  res.render("EvidenceDetail/autocilin", {
    data: data,
    login: login,
    id: id
  });
};

exports.propertyEvidence = async function (req, res) {
  const login = req.session.data;
  const kepo = await getAllEvd(18);
  const data = [];
  for (let i = 0; i < kepo.length; i++) {
    var code = kepo[i].code;
    var type = code.substring(0, 2);
    var product = code.substring(4, 6);
    if (parseInt(type) === 10 && parseInt(product) === 13) {
      var task = kepo[i].task;
      var branch = task.split("_");
      var cityCode = code.substring(2, 4);
      var getIndexCity = await findObj(kota, "code", parseInt(cityCode));
      var city = kota[getIndexCity].label
      data.push({
        id: kepo[i].id,
        city: city,
        datems: kepo[i].uploadtime,
        branch: branch[0],
      });
    }
  }
  res.render("EvidenceList/property", {
    data: data,
    login: login,
    kota: kota
  });
};
