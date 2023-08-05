const express = require('express')
const app = express()
const { products, people } = require('./data')
app.use(express.static('./methods-public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/all', (req, res) => {
    res.send(people)
})
app.post('/all', (req, res) => {
        const { name } = req.body
        if (!name) {
            res.status(404).send('please input a name')
        }
        res.status(201).json('successful')
    })
    //getting a particular name using the query string param
app.get('/all/data', (req, res) => {
    const { user, limit } = req.query
    let getSpecific = [...people]
    if (user) {
        getSpecific = getSpecific.filter((personData) => {
            return personData.name.startsWith(user) || personData.name.includes(user)
        })

    }
    if (limit) {
        getSpecific = getSpecific.slice(0, parseInt(limit))
    }
    if (getSpecific.length < 1)
    //or if(getspecific=' ') 
    {
        res.json({ success: false, data: 'unable to handle your request' })
    }
    res.status(200).send(getSpecific)


})
app.post('/login', (req, res) => {
    res.json({ success: true, data: 'it has been added' })
})
app.listen(3000, () => {
    console.log('nice server');
})