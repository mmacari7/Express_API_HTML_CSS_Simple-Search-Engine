// Michael Macari
// Router for handling /details

const express = require("express")
const router = express.Router()
const axios = require('axios')

// Get method for getting details on person by id
router.get("/:id", async (req, res) => {
    const person = await searchforPerson(req.params.id)
    res.render('details/detailedres', {person: person})
})

// Returns the person at the id that was passsed
async function searchforPerson(id){
    id = String(id)
    const allPeople = await getPeople()
    for(let i=0; i < allPeople.length; i++){
        if(String(allPeople[i].id) === id){
            return(allPeople[i])
        }
    }
    return(undefined)
}

async function getPeople(){
    // Get the data from the database
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json")
    return(data)
}

module.exports = router