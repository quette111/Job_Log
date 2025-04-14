const { userData } = require("../userData.js")





const getData = (req, res) => {
res.send(userData)
}

const postData = (req, res) => {
    console.log(req.body)
userData.push(req.body)
res.send(userData)
}

const putData = (req, res) => {

}

const deleteData = (req, res) => {

}

module.exports = {getData, postData, putData, deleteData}