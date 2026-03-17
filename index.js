import express from "express";
const app = express();

const port = 3000;

// basioc get opeartions
app.get("/", (req, res) => {
  res.send("do you want to become friend of cartel");
});

app.get("/gus", (req, res) => {
  res.send("chicken man !!!");
});

app.get("/hector", (req, res) => {
  res.send(" ding ! ding !! ding !!!");
});

// storing the data:
let acID = 1;
let moneyCollected = [];
app.use(express.json());
app.post("/money", (req, res) => {
  const { name, money } = req.body;
  const currMoney = {
    id: acID++,
    name,
    money,
  };
  moneyCollected.push(currMoney);
  res.status(201).send(currMoney);
});

// sending the whole data
app.get("/show", (req, res) => {
  res.status(201).send(moneyCollected);
});

// sending the data with particular id

app.get("/show/:id", (req, res) => {
  let curr =null;
  // extrcting id from the URL and converting it from string to int
  let id=Number(req.params.id);

  // finding the object with given id
  for (let index = 0; index < moneyCollected.length; index++) {
    const element = moneyCollected[index];
    if (id === element.id) {
      curr = element;
      break;
    }
  }
  // if we dont find object with given id
  if (!curr) {
   res.status(404).send("data with that id dont exist");
  }

  // returning the response
  res.status(201).send(curr);
});

// updaitng the data at given id
app.put("/change/:id",(req,res)=>
{
    const {money}=req.body;
    let id=Number(req.params.id);
    let changed=null;
    for(let i=0;i<moneyCollected.length;i++)
    {
      let elem=moneyCollected[i];
      if(id===elem.id)
      {
        elem.money=money;
        changed=elem;
        break;
      }
    }
    if(!changed)
    {
     return  res.status(404).send("data with that given id dont exist")
    }
    res.status(201).send(changed);
})

// deleting the data at given id
app.delete("/delete/:id",(req,res)=>
{
  // extracting id from the URL
  const id=(Number)(req.params.id);
  let deletedAc=null;
  for(let i=0;i<moneyCollected.length;i++)
  {
    // finding the element with the given id and delete it
    let elem=moneyCollected[i];
    if(id===elem.id)
    {
      deletedAc=elem;
      moneyCollected.splice(i,1);
      break;
    }
  }

  // if the element  with id is not found
  if(!deletedAc)
  {
    return res.status(404).send("data with the given id dont exist");
  }

  // returning the responsez
  return res.status(200).send(deletedAc);


})
app.get;
app.listen(port, () => {
  console.log(`the server is listining to port ${port} ...`);
});
