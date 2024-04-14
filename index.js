import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const port=3000;
const dir_name=dirname(fileURLToPath(import.meta.url));
const app=express();

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
    res.render(res.render(dir_name+"/public/index.ejs"));
});

