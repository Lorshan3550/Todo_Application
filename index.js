import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let tasks = [
  {
    name: 'office',
    startDate: '2023-08-24T21:58',
    endDate: '2023-08-24T21:58',
    type: 'work'
  },

  {
    name: 'SE',
    startDate: '2023-08-24T21:49',
    endDate: '2023-08-24T21:49',
    type: 'study'
  }, 

  {
    name: 'Go to the shopping',
    startDate: '2023-08-24T21:55',
    endDate: '2023-08-24T09:55',
    type: 'fun'
  },
  {
    name: 'Troubleshooting',
    startDate: '2023-08-24T21:49',
    endDate: '2023-08-24T21:49',
    type: 'other'
  }

]


function getTask(req,res,next){
  let task = {
    name : req.body['task'],
    startDate : req.body['startDate'],
    endDate : req.body['endDate'],
    type : req.body['type']
  }
  let flag = 0;
  for (const key in task) {
    if (task.hasOwnProperty(key) && task[key] !== undefined) {
      flag = 1
    }
    else{
      flag = 0
    }
  }
  if (flag != 0){
    console.log(task)
    tasks.push(task)
  }
  next()
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(getTask)


app.get("/", (req, res) => {
  res.render("index.ejs", {tasks : tasks})
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", {tasks : tasks})
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

