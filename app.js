const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname +"/date.js");


const app = express();
const items = ["Wake Up", "Exist", "Sleep"];
const workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req,res){
    
    let day = date.getDay();    
    // var curentDay = today.getDay();
    // var day = "";

    // switch (curentDay) {
    //     case 0:
    //         day= "Sunday";
    //         break;
    //     case 1:
    //         day= "Monday";
    //         break;
    //     case 2:
    //         day= "Tueday";
    //         break;
    //     case 3:
    //         day= "Wednesday";
    //         break;
    //     case 4:
    //         day= "Thursday";
    //         break;
    //     case 5:
    //         day= "Friday";
    //         break;
    //     case 6:
    //         day= "Saturday";
    //         break;
    //     default:
    //         console.log("Error: current day is " + curentDay);
    // };

    res.render("list.ejs", {listTitle: day, newListItems: items})
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work Task List", newListItems: workItems});
});

app.get("/about", function(req, res){
    res.render("about")
});

app.post("/work", function(req, res){
    const item = req.body.task;
    workItems.push(item);
    res.redirect("/work");
})
app.post("/", function(req, res){
    var item = req.body.task;
    
    console.log(item)
    
    if (req.body.button === "Work"){
        workItems.push(item); 
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/")
    }    

    // var item = req.body.task
    // items.push(item)
    
});

app.listen(4000, function(req,res){
    console.log("Server is running on Port 4000");
});