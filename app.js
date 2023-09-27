//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { error } = require("console");



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin_ajay:ajay1999@cluster0.3gvyhf1.mongodb.net/todolistDB');
const itemSchema=new mongoose.Schema({
    name : String,
  

});
const Item = mongoose.model("Item",itemSchema);
const item1 = new Item({
    name : "first task",
   })

const item2 = new Item({
    name : "second task",
   }) ;
const listSchema=new mongoose.Schema({
  name : String,
  items : [itemSchema]
});
const List = mongoose.model("List",listSchema);
   
  




app.get("/", function(req, res) {
Item.find()
.then(function(founditems){
  if (founditems.length === 0){
Item.insertMany([item1,item2])
.then(function(result){
  console.log("sucessfully inserted")
})
.catch(function(err){
  console.log(err)
});
res.redirect("/")
  }else{
     res.render("list", {listTitle: "Today", newListItems:founditems});
  }
  
 
})
.catch(function(err){
  console.log(err)
});
app.get("/:customListName",function(req,res){
 const customListName = req.params.customListName;
 List.findOne({name : customListName})
 .then(function(foundList){
  if(!foundList){
    const list =new List({
  name: customListName,
  items:[item1,item2]
 })
    list.save();
    res.redirect("/"+customListName)
  }else{
   res.render("list", {listTitle: foundList.name, newListItems:foundList.items})
  }
})
  .catch(function(err){
    console.log(err)
  })
 })
 

 
});

app.post("/", function(req, res){


  const itemName = req.body.newItem;
  const item = new Item({
    name :itemName
  })
  item.save();
  res.redirect("/");

})
app.post("/delete",function(req,res){
const checkedItem =  req.body.checkbox;
Item.findByIdAndRemove(checkedItem)
.then(function(result){
  console.log("sucessfully delted")
  res.redirect("/");
})
.catch(function(err){
  console.log(err)
})


})
app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
