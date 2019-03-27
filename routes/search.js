// Michael Macari
// Router for handling /search

const express = require("express")
const router = express.Router()
const axios = require('axios')

router.post("/", async (req, res) => {
    // Gets the persons name from the request body
    let personName = req.body.personName

    if(!personName){
        res.status(400).render('people/searcherror')
        return
    }
    else {

        // Calls the search function
        let matches = await searchPeople(personName)

        // Creates a new JSON file to pass to search results handlebars
        let newJson = {
            searchTerm: personName,
            personsArray: matches
        }

        res.render('people/searchres', {people: newJson})
    }
})

// Returns an array of people based on the search criteria
async function searchPeople(searchString){
    searchString = searchString.toLowerCase()
    let matches = []
    const allPeople = await getPeople()
    
    for(let i=0; i < allPeople.length; i++){
        // Search for the string in the persons first name and last name
        if(allPeople[i].firstName.toLowerCase().includes(searchString) || allPeople[i].lastName.toLowerCase().includes(searchString)){
            if(matches.length < 20){
                matches.push(allPeople[i])
            }
            else{
                break
            }
        }
    }

    return(matches)
}

async function getPeople(){
    // Get the data from the database
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json")
    return(data)
}


module.exports = router