import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const port = 3000;
const dir_name = dirname(fileURLToPath(import.meta.url));
const app = express();

var mainDb = [{
    userName: "Test_User1",
    balanceAmount: 10000,
    userId: "SBank2024001"
},
{
    userName: "Test_User2",
    balanceAmount: 15000,
    userId: "SBank2024002"
},
];
var idCount=2;
var logBook=[];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.listen(port, () => {
    console.log("Server Activated: ", port);
});

app.get('/', (req, res) => {
    res.locals = {
        myArr: mainDb
    };
    res.render(dir_name + "/public/Home.ejs");
});

app.post("/createUser", (req, res) => {
    idCount++;
    var valu = parseInt(req.body["Amount"]);
    var obj1 = {
        userName: req.body["Name"],
        balanceAmount: valu,
        gender: req.body["gender"],
        userId: "SBank202400" + idCount
    }
    mainDb.push(obj1);
    console.log(mainDb);
    res.redirect("/userDetails");
});

app.get("/userDetails", (req, res) => {
    res.locals = {
        myArr: mainDb
    };
    res.render(dir_name + "/public/Home.ejs");
});

app.post("/tranferRequest", (req, res) => {
    var from = req.body["from"];
    var to = req.body["to"];
    var amtt = req.body["Amount"];
    var amt = parseInt(amtt);
    calPerform(from,to,amt);
    res.redirect("/userDetails");
});

app.get("/addUsers", (req, res) => {
    res.locals = {
        myArr: mainDb
    };
    res.render(dir_name + "/public/addUsers.ejs");

});

app.get("/moneyTransfer", (req, res) => {
    res.locals = {
        myArr: mainDb
    };
    res.render(dir_name + "/public/moneyTransfer.ejs");

});

function calPerform(from,to,amt) 
{
    if (mainDb[from].balanceAmount >= amt) {
        mainDb[to].balanceAmount += amt;
        mainDb[from].balanceAmount -= amt;
        logReport(from,to,amt,true);  
    }
    else
    {
        logReport(from,to,amt,false);
    }
};

function logReport(from,to,amt,flag)
{
    var message;
    if(flag==true)
    {
        message="Success!";
    }else
    {
        message="Failed!";
    }

    var currentDate = new Date();

    var indianDateTime = currentDate.toLocaleString('en-IN');

    var obj={
    serialNo: logBook.length+1,
    senderId: mainDb[from].userId,
    senderName: mainDb[from].userName,
    reciverId: mainDb[to].userId,
    reciverName: mainDb[to].userName,
    transactionAmount: amt,
    transactionResult: message,
    transactionDate: indianDateTime
    };

    logBook.push(obj);
    console.log(obj);
}

app.get("/tranasctionHistory", (req,res) =>
{
    res.locals={
        logBooks: logBook
    };
    res.render(dir_name+"/public/transactionRecords.ejs");
});