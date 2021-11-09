const express = require("express")
const reportControllers = require("../controllers/report")
const Router = express()

Router.get("/detail", reportControllers.getDetail)
Router.get("/detail/salesbooth", reportControllers.getDetailSalesBooth)
Router.get("/detail/servicepoint", reportControllers.getDetailServicePoint)
Router.get("/detail/cec", reportControllers.getDetailCec)
Router.get("/detail/kyc", reportControllers.getDetailKyc)
Router.get("/detail/evidence/:idc", reportControllers.getDetailCabang)
Router.get("/detail/evidence/:idc/service", reportControllers.getDetailCabangService)
Router.get("/detail/evidence/:idc/:type", reportControllers.getDetailCabangType)
Router.get("/ach/table", reportControllers.getAchTable)
Router.get("/ach/chart", reportControllers.getAchChart)


Router.get("/detail/jeniuscc", reportControllers.getDetailJeniusCC)

module.exports = Router;