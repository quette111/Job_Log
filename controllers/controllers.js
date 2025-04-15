let { userData } = require("../userData.js")





const getData = (req, res) => {
res.send(userData)
}

const postData =  async (req, res) => {
try{
userData.push(req.body)


res.send(userData)
console.log(userData)
}
catch(error){
    console.log(error)
}
}

const putData = (req, res) => {

}

const deleteData = (req, res) => {

}

module.exports = {getData, postData, putData, deleteData}