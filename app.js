const facts = require("./facts.json")
const express = require('express')
const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.use(express.static('public'));

app.get("/", (req, res) => {

    res.send("Good Job!")

})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)

    res.render('greet', {title: "Greeting", message : `Hey, ${req.query.name}, you are ${2023 - parseInt(req.query.year)} or ${2024 - parseInt(req.query.year)} years old (depending on when your birthday is)`})
    // res.send(`Hey, ${req.query.name}, you are ${2023 - parseInt(req.query.year)} or ${2024 - parseInt(req.query.year)} years old (depending on when your birthday is)`)
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    let num1 = parseFloat(req.params.num1)
    let num2 = parseFloat(req.params.num2)
    let op = req.params.op;
    if(op === "add")
    {
        res.render('math', {title: "Math", message : `${num1} + ${num2} = ${num1 + num2}`})
        // res.send(`${num1} + ${num2} = ${num1 + num2}`)
    }
    else if(op === "subtract")
    {
        res.render('math', {title: "Math", message : `${num1} - ${num2} = ${num1 - num2}`})
        // res.send(`${num1} - ${num2} = ${num1 - num2}`)
    }
    else if(op ==="times")
    {
        res.render('math', {title: "Math", message : `${num1} * ${num2} = ${num1 * num2}`})
        // res.send(`${num1} * ${num2} = ${num1 * num2}`)
    }
    else if(op ==="divideby")
    {
        res.render('math', {title: "Math", message : `${num1} / ${num2} = ${num1 / num2}`})
        // res.send(`${num1} / ${num2} = ${num1 / num2}`)
    }
    else if(op ==="tothepowerof")
    {
        res.render('math', {title: "Math", message : `${num1} ^ ${num2} = ${num1 ** num2}`})
    }
    else
    {
        res.status(404, "Error 404, that operation is not supported")
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
        res.send(`<h1>Pandora's Box</h1><img src="https://random.imagecdn.app/500/500">`)
        // fetch("https://picsum.photos/200", {
        //     headers: {
        //         "Accept": "image/png"
        //     }
        //     })
        //     .then((data) => {
        //         res.render('pandorasbox', {title: "Pandora's Box", message : data} )
        //     })
    }

})