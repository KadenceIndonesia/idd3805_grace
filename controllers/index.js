const path = require("path")
const session = require("express-session")
const pid = process.env.PID
const axios = require("axios")
require("../library")
require("../library/achievement");
const colors = ["#75A43D", "#95C261", "#3bcbb2", "#F5A149", "#FFBE64", "#FFBE64"];


exports.getIndex = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data;
        const totalCore = await achievementProject(`${pid}_core`);
        const totalNonCore = await achievementProject(`${pid}_noncore`);
        const totalRenewal = await achievementProject(`${pid}_renewal`);
        
        const totalDanamon = await achievementProject(`${pid}_danamon`);
        const totalADMF = totalCore.total + totalNonCore.total + totalRenewal.total;
        const total = totalADMF + totalDanamon.total;
        let dataTotal = [
            {
                label: "Total",
                total: total,
                y: 0,
                color: "#75A43D"
            },
            {
                label: "Danamon",
                total: totalDanamon.total,
                y: 0,
                color: "#95C261"
            },
            {
                label: "Adira Finance(ADMF)",
                total: totalADMF,
                y: 0,
                color: "#3bcbb2"
            }
        ]
        

        const danamonS1 = await achievementbyQuest(`${pid}_danamon`, "S1");
        let breakDanamon = [
            {
                label: "Autocillin",
                total: 0,
                y: 0,
                color: "#75A43D"
            },
            {
                label: "Property",
                total: 0,
                y: 0,
                color: "#95C261"
            }
        ]
        for (let i = 0; i < danamonS1.length; i++) {
            if(danamonS1[i].code>2){
                breakDanamon[0].total = breakDanamon[0].total+danamonS1[i].y
            }else{
                breakDanamon[1].total = breakDanamon[1].total+danamonS1[i].y
            }
        }

        let breakAdmf = [
            {
                label: "Autocilin",
                total: 0,
                y: 0,
                color: colors[0]
            },
            {
                label: "Motopro",
                total: 0,
                y: 0,
                color: colors[1]
            },
            {
                label: "DB",
                total: 0,
                y: 0,
                color: colors[2]
            },
            {
                label: "Typhus",
                total: 0,
                y: 0,
                color: colors[3]
            },
            {
                label: "Mobilite",
                total: 0,
                y: 0,
                color: colors[4]
            },
            {
                label: "Motolite",
                total: 0,
                y: 0,
                color: colors[5]
            }
        ]
        res.render("index",{
            login: login,
            dataTotal: dataTotal,
            breakDanamon: breakDanamon,
            breakAdmf: breakAdmf
        })
    }else{
        res.redirect("./login")
    }
}

exports.getLogin = (req,res)=>{
    res.send("login")
}