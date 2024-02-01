const facts = require("./facts.json")
const express = require('express')
const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("Good Job!")

})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)

    res.send(`hey, ${req.query.name}`)
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    let num1 = parseFloat(req.params.num1)
    let num2 = parseFloat(req.params.num2)
    let op = req.params.op;
    if(op === "add")
    {
        res.send(`${num1} + ${num2} = ${num1 + num2}`)
    }
    else if(op === "subtract")
    {
        res.send(`${num1} - ${num2} = ${num1 - num2}`)
    }
    else if(op ==="times")
    {
        res.send(`${num1} * ${num2} = ${num1 * num2}`)
    }
    else if(op ==="divideby")
    {
        res.send(`${num1} / ${num2} = ${num1 / num2}`)
    }
    else
    {
        res.status(404, )
    }
})

app.get('/pandorasbox', (req, res)=> {

    // do the work
    const rand = Math.random()
    if(rand < .333)
    {
        fetch("https://icanhazdadjoke.com", {
            headers: {
                "Accept": "application/json"
            }
            })
            .then(res => res.json())
            .then((data) => {
                res.render('pandorasbox', {title: "Pandora's Box", message : data.joke} )
            })
    }
    else if(rand < .666)
    {
        // const message = "DAD JOKE"
        const length = facts.length
        const random = Math.floor(Math.random() * length)
        const message = facts[random].fact
    
        res.render('pandorasbox', {title: "Pandora's Box", message} )

    }
    else
    {
        res.render('pandorasbox', {title: "Pandora's Box", message: "joemomma"})
    }

})