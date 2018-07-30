// Creating the server

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

var reservations = [

    {
        customerName: "drake",
        customerNumber: "978-875-8787",
        customerEmail: "keke98@gmail.com",
        uniqueId: "doYouLoveMe"
    },

    {
        customerName: "Kisha",
        customerNumber: "347-875-8708",
        customerEmail: "Kisha8@gmail.com",
        uniqueId: "loveHenny"
    }
];

var waitList = [
    {
        customerName: "K-B",
        customerNumber: "216-021-1488",
        customerEmail: "K-b78@gmail.com",
        uniqueId: "KB78"
    }
];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/currentreservations", function (req, res) {
    res.sendFile(path.join(__dirname, "current-reservations.html"));
});

app.get("/makereservation", function (req, res) {
    res.sendFile(path.join(__dirname, "make-reservation.html"));
});

app.get('/api/reservations', function (req, res) {
    res.json(reservations);
});

app.get('/api/waitlist', function (req, res) {
    res.json(waitList);
});

app.get("/api/reservations/:customer", function (req, res) {
    var chosen = req.params.customer;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].customerName) {
            return res.json(reservations[i]);
        }
    }
    return res.send("No Customer Found");
});

app.post("/api/reservations", function (req, res) {
    var newCustomer = req.body;
    reservations.push(newCustomer);
    res.json(newCustomer);
});