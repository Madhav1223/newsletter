const { json } = require("body-parser");
const bodyParser = require("body-parser");
const express = require("express");
// const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("Public")); // to open statuc data like stylr.css image
// Better to create a folder for public static data and locate it.
//app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    console.log("Data received");
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const url = "https://us18.api.mailchimp.com/3.0/lists/47376995b9"
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname,
                }
            }]//Capital value are the default of mailchip
    }
    const json = JSON.stringify(data);
    console.log(json);
    const option = {
        method: "POST",
        auth: "Madhav:7d6205b2aa43c2e555afe4b880376fe5-us18"
    }
    const request = https.request(url, option, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
            console.log(response.statusCode)
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/sucess.html")

            } else {
                res.sendFile(__dirname + "/failure.html")

            }
        })

    })
    request.write(json);
    request.end();
})
app.post("/failure",function (req,res) {
    res.redirect("/")
});
