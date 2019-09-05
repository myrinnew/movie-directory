const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
})

app.get("/results", (req, res) => {
    const searched = req.query.search;
    const url = `http://omdbapi.com/?s=${searched}&apikey=thewdb`;
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body);
            const newData = data.Search;
            res.render("results", {data: newData});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Movie App has started");
});