import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const port=3000;
const dir_name=dirname(fileURLToPath(import.meta.url));
const app=express();

var mainDb=[];
var idCount=0;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.listen(port,() =>
{
console.log("Server Activated: ",port);
});

app.get('/', (req,res) => {
    res.locals={
        name: "Deep",
    };
    res.render(dir_name+"/public/index.ejs");
});

app.post("/createUser", (req,res) => 
{
    idCount++;
    var obj={
        userName: req.body["Name"],
        balanceAmount: req.body["Amount"],
        userId: idCount
    }
    mainDb.push(obj);
    console.log(mainDb);
    res.redirect("/userDetails");
});

app.get("/userDetails", (req,res) => {
    res.locals={
        myArr: mainDb
    };
    res.render(dir_name+"/public/accDetails.ejs");
});


