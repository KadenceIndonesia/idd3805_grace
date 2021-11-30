const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    idkepo: String,
    project: Number,
    task: String,
    deskripsi: String,
    code: String,
    state: Number,
    open: String,
    tmpusername: String,
    filename: Array || String,
    src: String,
    grp: String,
    uploadtime: String,
    type: String,
    subtype: String
})

module.exports = mongoose.model('Task', taskSchema);