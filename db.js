const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/listDB');
const listSchema=new mongoose.Schema({
    name : String,
  

});
const List = mongoose.model("List",listSchema);
const kiwi = new List({
    name : "kiwi",
   })

const custrd = new List({
    name : "custrd",
   })   
   
  
List.insertMany([kiwi,custrd])
.then(function(result){
  console.log(result)
})
.catch(function(err){
  console.log(err)
});