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
   prompt();

});

function prompt(){
  inquirer.prompt([
    {
      type: "list",
      message: "Menu Options",
      name: "id",
      choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add a New Product']
    }
    
  ])
  .then(function(inquirerResponse) {

  console.log(inquirerResponse.id);

  switch(inquirerResponse.id){
  
  case 'View Products for Sale':
    viewProducts();
    break;
  
  case 'View Low Inventory':
    viewLowInventory();
    break;
  
  case 'Add to Inventory':
    checkInventory();
    break;
  
  case 'Add a New Product':
    addProduct();
    break;  
 
  }

  
});
};

function viewProducts(){
      connect.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
          for(var i = 0; i < res.length; i++) {
      console.log("Item ID: "+ res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price + " | Left in Stock: " + res[i].stock_quantity);
        }        
    });
}
var inventory = 0;
function viewLowInventory(){
  connect.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
          for(var i = 0; i < res.length; i++) {
            
            if (res[i].stock_quantity < 5) {
              console.log("Item ID: "+ res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price + " | Left in Stock: " + res[i].stock_quantity);
            }
        }        
    });
}
function checkInventory(){
   inquirer.prompt([
    {
      type: "list",
      message: "Please enter the ID of the product?",
      name: "id",
      choices: ['1','2','3','4','5','6','7','8','9','10','11']

    },
    {
      type: "input",
      message: "How many inputs would you like to add?",
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
//console.log(inquirerResponse.units);
 connect.query(
    "SELECT * FROM products WHERE ?",
[
{
    item_id : inquirerResponse.id  
}
],
function(error,res){
    if(error) throw err;
  

//console.log(inquirerResponse.input);

    for(var k = 0; k < res.length;k++){
     var  stock = parseInt(res[k].stock_quantity);  
      //console.log(stock); 
      var input = parseInt(inquirerResponse.units);
      //console.log(inquirerResponse.units);
      var updatedStock = input + stock;
      //console.log(updatedStock);
      //console.log(inquirerResponse.id)
      addInventory(updatedStock,inquirerResponse.id);
     }
    
    });
//console.log(stock);
  
  
});
}

function addInventory(newStock,id){

connect.query(
    "UPDATE products SET ?  WHERE ?",
[
  {
    stock_quantity:  newStock
  },

  {
    item_id : id  
  }
],
function(error,res){
    if(error) throw err;
 console.log("Item Id: "+ id + " has been updated!");
 

  
  });
}

function addProduct(){
   inquirer.prompt([
    {
      type: "input",
      message: "What will this product be named?",
      name: "name",
    

    },
     {
      type: "input",
      message: "What department will hold this product?",
      name: "depart",
    

    },
    {
      type: "input",
      message: "What will this product be priced at?",
      name: "price",
      validate: function(value){
        if (isNaN(value) !== true) {
            return true;
        }else {
            return false;
        }
      }

    },
    {
      type: "input",
      message: "How many inputs will be in stock?",
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
  
 connect.query(
        "INSERT INTO products SET ?",
        {
          product_name: inquirerResponse.name,
          department_name: inquirerResponse.depart,
          price: inquirerResponse.price,
          stock_quantity: inquirerResponse.units
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was created successfully!");

          
        }
      );
    });
}




  
