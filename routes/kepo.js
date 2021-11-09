const express = require("express")
const kepoControllers = require("../controllers/kepo")
const Router = express();

Router.get("/core", kepoControllers.coreEvidence);
Router.get("/noncore", kepoControllers.nonCoreEvidence);
Router.get("/renewal", kepoControllers.renewalEvidence);

Router.get("/autocilin", kepoControllers.autocilinEvidence);
Router.get("/property", kepoControllers.propertyEvidence);

module.exports = Router;