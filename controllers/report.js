const mongoose = require("mongoose");
const Task = require("../models/task");
const axios = require("axios");
const pid = process.env.PID;
const moment = require("moment");
const { getJsDateFromExcel } = require("excel-date-to-js");
require("../library");

const dataKota = [
  { label: "Jabodetabek", code: 1 },
  { label: "Bandung", code: 2 },
  { label: "Surabaya", code: 3 },
  { label: "Malang", code: 4 },
  { label: "Medan", code: 5 },
  { label: "Makassar", code: 6 },
  { label: "Palembang", code: 7 },
  { label: "Yogyakarta", code: 8 },
  { label: "Bali", code: 9 },
  { label: "Semarang", code: 10 },
];

const dataMalls = [
  { label: "Kota Kasablanka Lt LG", code: 1 },
  { label: "Grand Indonesia", code: 2 },
  { label: "Pondok Indah Mall 1", code: 3 },
  { label: "Sumarecon Mall Serpong", code: 4 },
  { label: "Sumarecon Mall Bekasi", code: 5 },
  { label: "Pejaten Village", code: 6 },
  { label: "TSM Cibubur", code: 7 },
  { label: "Mall Kelapa Gading 2", code: 8 },
  { label: "Botani Square", code: 9 },
  { label: "Lippo Mall Puri", code: 10 },
  { label: "Central Park", code: 11 },
  { label: "Supermall Karawaci", code: 12 },
  { label: "Plaza Atrium", code: 13 },
  { label: "Blok M Plaza", code: 14 },
  { label: "Living World Alam Sutra", code: 15 },
  { label: "TSM Bandung", code: 16 },
  { label: "Paris Van Java", code: 17 },
  { label: "Festival Citilink", code: 18 },
  { label: "Ciwalk", code: 19 },
  { label: "Paskal 23 Mall", code: 20 },
  { label: "Royal Plaza", code: 21 },
  { label: "Tunjungan Plaza 3", code: 22 },
  { label: "Pakuwon City Mall", code: 23 },
  { label: "Delta Plaza", code: 24 },
  { label: "Pakuwon Mall", code: 25 },
  { label: "Malang Town Square", code: 26 },
  { label: "Malang Mall Olympic Garden", code: 27 },
  { label: "Medan Sun Plaza Mall", code: 28 },
  { label: "Medan Center Point", code: 29 },
  { label: "Medan Plaza Medan Fair", code: 30 },
  { label: "Makassar TSM Makassar", code: 31 },
  { label: "Makassar Panakkukang Mall", code: 32 },
  { label: "Palembang Icon", code: 33 },
  { label: "Yogyakarta Plaza Ambarukmo", code: 34 },
  { label: "Yogyakarta Hartono Mall", code: 35 },
  { label: "Yogyakarta Jogja City Mall", code: 36 },
  { label: "Yogyakarta Mall Galleria Jogja", code: 37 },
  { label: "Yogyakarta Malioboro Mall", code: 38 },
  { label: "Mall Bali Galeria", code: 39 },
  { label: "Semarang Paragon City", code: 40 },
  { label: "Semarang DP Mall", code: 41 },
  { label: "Semarang Ciputra  Mall", code: 42 },
];

exports.getDetail = async function (req, res) {
  if (req.session.loggedin == true) {
    const login = req.session.data;
    res.render("listcabang", {
      login: login,
    });
  } else {
    res.redirect("../../login");
  }
};

exports.getDetailSalesBooth = async function (req, res) {
  if (req.session.loggedin == true) {
    const login = req.session.data;
    var dataExcel = await getData(pid, "salesbooth");
    var data = [];
    for (let i = 0; i < dataExcel.length; i++) {
      var findArrKota = await findObj(dataKota, "code", dataExcel[i]["Kota"]);
      var findArrMalls = await findObj(dataMalls, "code", dataExcel[i]["S0"]);
      data.push({
        id: dataExcel[i].SbjNum,
        kepo: dataExcel[i].kepo,
        datems: dataExcel[i]["TglKunjungan"],
        city: dataKota[findArrKota].label,
        malls: dataMalls[findArrMalls].label,
        agent: dataExcel[i]["NamaAgent"],
        teamleader: dataExcel[i]["NamaLeader"],
      });
    }
    res.render("detail/salesbooth", {
      login: login,
      data: data,
      datakota: dataKota,
      datamalls: dataMalls,
    });
  } else {
    res.redirect("../../login");
  }
};

exports.getDetailServicePoint = async function (req, res) {
  if (req.session.loggedin == true) {
    const login = req.session.data;
    var dataExcel = await getData(pid, "servicepoint");
    var data = [];
    for (let i = 0; i < dataExcel.length; i++) {
      var findArrKota = await findObj(dataKota, "code", dataExcel[i]["Kota"]);
      var findArrMalls = await findObj(dataMalls, "code", dataExcel[i]["S0"]);
      data.push({
        id: dataExcel[i].SbjNum,
        kepo: dataExcel[i].kepo,
        datems: dataExcel[i]["TglKunjungan"],
        city: dataKota[findArrKota].label,
        malls: dataMalls[findArrMalls].label,
        agent: dataExcel[i]["NamaAgent"]
      });
    }
    // for (let i = 0; i < evd.length; i++) {
    //   var evdCode = evd[i].code;
    //   var getLokasi = evd[i].deskripsi.split("_");
    //   if (evd[i].filename.length > 0) {
    //     data.push({
    //       id: evd[i].id,
    //       datems: evd[i].uploadtime,
    //       city: getLokasi[1],
    //       malls: getLokasi[2],
    //     });
    //   }
    // }
    res.render("detail/servicepoint", {
      login: login,
      datakota: dataKota,
      datamalls: dataMalls,
      data: data,
    });
  } else {
    res.redirect("../../login");
  }
};
exports.getDetailCec = async function (req, res) {
  if (req.session.loggedin == true) {
    const login = req.session.data;
    var dataCecChat = await getData(pid, "cec%2Fchat");
    var dataCecCall = await getData(pid, "cec%2Fcallcenter");
    var dataCecTwitter = await getData(pid, "cec%2Ftwitter");
    var dataCecEmail = await getData(pid, "cec%2Femail");
    var dataCecCallcenter = await getData(pid, "cec%2Fcallcenter");
    var data = [];
    for (let i = 0; i < dataCecChat.length; i++) {
      data.push({
        id: dataCecChat[i].SbjNum,
        datems: moment(getJsDateFromExcel(dataCecChat[i].TglChat)).format(
          "D-MM-YYYY"
        ),
        channel: "Chat",
        agent: dataCecChat[i].NamaAgent,
      });
    }
    for (let i = 0; i < 15; i++) {
      data.push({
        id: dataCecCall[i].SbjNum,
        datems: moment(getJsDateFromExcel(dataCecCall[i].TglPanggilan)).format(
          "D-MM-YYYY"
        ),
        channel: "Call Center",
        agent: dataCecCall[i].NamaAgent,
      });
    }
    for (let i = 0; i < dataCecTwitter.length; i++) {
      data.push({
        id: dataCecTwitter[i].SbjNum,
        datems: moment(getJsDateFromExcel(dataCecTwitter[i].TglChat)).format(
          "D-MM-YYYY"
        ),
        channel: "Twitter",
        agent: dataCecTwitter[i].NamaAgentJCC,
      });
    }
    for (let i = 0; i < dataCecEmail.length; i++) {
      data.push({
        id: dataCecEmail[i].SbjNum,
        datems: moment(getJsDateFromExcel(dataCecEmail[i].TglEmail)).format(
          "D-MM-YYYY"
        ),
        channel: "E-mail",
        agent: dataCecEmail[i].NamaAgent,
      });
    }
    res.render("detail/cec", {
      login: login,
      data: data,
    });
  } else {
    res.redirect("../../login");
  }
};
exports.getDetailKyc = async function (req, res) {
  if (req.session.loggedin == true) {
    const login = req.session.data;
    var dataExcel = await getData(pid, "kyc");
    var data = [];
    for (let i = 0; i < dataExcel.length; i++) {
      data.push({
        id: dataExcel[i].SbjNum,
        datems: moment(getJsDateFromExcel(dataExcel[i].TglVideo)).format(
          "D-MM-YYYY"
        ),
        agent: dataExcel[i].NamaAgent,
      });
    }
    res.render("detail/kyc", {
      login: login,
      data: data,
    });
  } else {
    res.redirect("../../login");
  }
};

exports.getDetailCabang = async function (req, res) {
  const idc = req.params.idc;
  var data = await getEvdById(idc);
  if (req.session.loggedin == true) {
    const login = req.session.data;
    res.render("detailcabang", {
      login: login,
      idc: idc,
      data: data,
    });
  } else {
    res.redirect("../../../login");
  }
};

exports.getDetailCabangService = async function (req, res) {
  const idc = req.params.idc;
  var data = await getEvdById(idc);
  if (req.session.loggedin == true) {
    const login = req.session.data;
    res.render("detailcabangservice", {
      login: login,
      idc: idc,
      data: data,
    });
  } else {
    res.redirect("../../../login");
  }
};

exports.getDetailCabangType = async function (req, res) {
  const idc = req.params.idc;
  const subtype = req.params.type;
  var getevd = await getEvdById(idc);
  var data = [];
  for (let i = 0; i < getevd.length; i++) {
    if (getevd[i].subtype == subtype) {
      data.push(getevd[i]);
    }
  }
  if (req.session.loggedin == true) {
    const login = req.session.data;
    res.render("detailcabangcec", {
      login: login,
      idc: idc,
      data: data,
    });
  } else {
    res.redirect("../../../login");
  }
};

exports.getAchTable = async function (req, res) {
  if (req.session.loggedin == true) {
    const login = req.session.data;
    res.render("achievement/table", {
      login: login,
    });
  } else {
    res.redirect("../../login");
  }
};
exports.getAchChart = async function (req, res) {
  if (req.session.loggedin == true) {
    const login = req.session.data;
    res.render("achievement/chart", {
      login: login,
    });
  } else {
    res.redirect("../../login");
  }
};

exports.getDetailJeniusCC = async function (req, res) {
  if (req.session.loggedin == true) {
    const login = req.session.data;
    var data = [];
    var dataExcel = await getData(pid, "jeniuscc");
    for (let i = 0; i < dataExcel.length; i++) {
      data.push({
        id: dataExcel[i].SbjNum,
        datems: moment(getJsDateFromExcel(dataExcel[i].tanggal)).format(
          "D-MM-YYYY"
        ),
        agent: dataExcel[i].NamaAgent,
      });
    }
    res.render("detail/jeniuscc", {
      data: data,
      login: login,
      datakota: dataKota,
      datamalls: dataMalls,
    });
  } else {
    res.redirect("../../login");
  }
};
