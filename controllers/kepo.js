const mongoose = require("mongoose");
const Task = require("../models/task");
const axios = require("axios");
const pid = process.env.PID;
const moment = require("moment");

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
  const data = [];
  res.render("EvidenceList/autocilin", {
    data: data,
    login: login,
  });
};

exports.propertyEvidence = async function (req, res) {
  const login = req.session.data;
  const data = [];
  res.render("EvidenceList/property", {
    data: data,
    login: login,
  });
};
