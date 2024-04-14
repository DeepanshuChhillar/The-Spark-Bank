import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const port=3000;
const dir_name=dirname(fileURLToPath(import.meta.url));
const app=express();

var mainDb=[{
    userName: "Bhai",
    balanceAmount: 5000,
    userId: "SBank2024001"
},
{
    userName: "Tingo",
    balanceAmount: 50000,
    userId: "SBank2024002"
},
{
    userName: "Deepu",
    balanceAmount: 8000,
    userId: "SBank2024003"
}];
var idCount=3;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.listen(port,() =>
{
console.log("Server Activated: ",port);
});

app.get('/', (req,res) => {
    res.locals={
        myArr: mainDb
    };
    res.render(dir_name+"/public/Home.ejs");
});

app.post("/createUser", (req,res) => 
{
    idCount++;
    var obj1={
        userName: req.body["Name"],
        balanceAmount: req.body["Amount"],
        userId: "SBank202400"+idCount
    }
    mainDb.push(obj1);
    console.log(mainDb);
    res.redirect("/userDetails");
});

app.get("/userDetails", (req,res) => {
    res.locals={
        myArr: mainDb
    };
    res.render(dir_name+"/public/Home.ejs");
});

app.post("/tranferRequest", (req,res) => {
    console.log(req.body);
    res.redirect("/userDetails");
});

app.get("/addUsers", (req,res) => 
{
    res.locals={
        myArr: mainDb
    };
    res.render(dir_name+"/public/addUsers.ejs");

});

app.get("/moneyTransfer", (req,res) => 
{
    res.locals={
        myArr: mainDb
    };
    res.render(dir_name+"/public/moneyTransfer.ejs");

});
