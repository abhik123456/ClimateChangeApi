const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const articles = []

const newspapers = [
    {
        name:'thetimes',
        address:'https://www.thetimes.co.uk/environment/climate-change',
        base: '' 
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: ''
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk'
    }
]

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const ss = cheerio.load(html)

        ss('a:contains("climate")', html).each(function() {
            const title = ss(this).text()
            const url = ss(this).attr('href')

            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })
        })
        res.json(articles)
    })
})

app.get('/abhik', (req,res) => {
    res.json('welcome to my climat echange news api')
})

app.get('/news', (req,res) => {

   // axios.get('https://www.theguardian.com/environment/climate-crisis')
   // .then((response) => {
     //   const html = response.data
     //   const ss = cheerio.load(html)

     //   ss('a:contains("climate")', html).each(function () {
      //      const title = ss(this).taxt
       //     const url = ss(this).attr('href')
       //     articles.push({
       //         title,
        //        url
        //    })

       // })
      //  res.json(articles)

   // })
   res.json(articles)

})



app.listen(PORT, () => console.log('server running on PORT ${PORT}'))