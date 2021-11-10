const axios = require("axios");

global.achievementProject = function(pid){
    return new Promise(resolve => {
        axios.get(`${process.env.APIURL}/api/achievement/${pid}`)
        .then((response) => {
            resolve(response.data)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.achievementbyQuest = function(pid, qidx){
    return new Promise(resolve => {
        axios.get(`${process.env.APIURL}/api/achievement/${pid}/${qidx}`)
        .then((response) => {
            resolve(response.data)
        })
        .catch(error => {
            resolve(error)
        })
    })
}