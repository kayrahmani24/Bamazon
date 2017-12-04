var mysql = require("mysql");
var inquirer = require("inquirer");
var connect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});
connect.connect(function (err) {
    if(err) throw err;
    console.log("connected as id " + connect.threadId);

    selectAll();
    

});

function selectAll() {
  //Function to display all products
    connect.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
          for(var i = 0; i < res.length; i++) {
            console.log("Item ID: "+ res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price);
        //console.log(res[i].price);
        }
         prompt();
    });
}
function prompt(){

  inquirer.prompt([
    {
      type: "list",
      message: "Please enter the ID of the product you would like to purchase?",
      name: "id",
      choices: ['1','2','3','4','5','6','7','8','9','10','11']

    },
    {
      type: "input",
      message: "How many inputs would like to purchase?",
      name: "units",
      validate: function(value){
        if (isNaN(value) !== true) {
            return true;
        }else {
            return false;
        }
      }

    }
    
  ])
  .then(function(inquirerResponse) {

  validateOrder(inquirerResponse.id,inquirerResponse.units);
  
});
};
var updatedInventory = 0;
function validateOrder(id,quantity){
connect.query(
    "SELECT * FROM products WHERE ?",
[
{
    item_id : id  
}
],
function(error,res){
    if(error) throw err;
  
    for(var k = 0; k < res.length;k++){
      var stock = res[k].stock_quantity;
      var price = res[k].price;

     }
 
     if (quantity > stock) {
        console.log("Sorry we do not have enough inventory to fufill your order");
        prompt();
     }else {
         //connect.query("UPDATE products SET stock_quantity = ? WHERE ?"
         updatedInventory = stock - quantity;
         var cost = price * quantity;
         console.log("Your order is being processed!");
         console.log("Your total balance is: $"+ cost);
         updateInventory(id,updatedInventory);     
     }
});

}
function updateInventory(id,inventory){
//console.log(updatedInventory);

connect.query(
    "UPDATE products SET ? WHERE ?",
[
  {
    stock_quantity: inventory
  },
  {
    item_id : id  
  }
],
function(error,res){
    if(error) throw err;
  
console.log("Product has been updated!");
  

  });
}








