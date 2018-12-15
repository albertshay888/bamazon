// Required dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

// Create the connection to mysql bamazon DB 
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password and selected database
  password: "password",
  database: "bamazon"
});

// Connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

});

// Display item_id, product_name, price, and stock_quantity
var display = function() {
  connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      
      console.log(
        '\n                         Bamazon: Top 10 Selling Products'                 +
        '\n                                -Updated Hourly-         ' + '         \n'
        );
      // Log the table based on query results using console.table package
      console.table(results);
  })
};

// Initiate a function that will prompt the user
var run = function() {
  
  connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      // using inquier, prompt the user for which product they'd like to purchase from the list 
      inquirer.prompt([
          {
              name: "product",
              type: "list",
              choices: function() {
                  var choiceArray = [];
                 
                  // loop through all products in the bamazon database
                  for (var i = 0; i < results.length; i++) {
               
                      // push the selected item by the user into an array 
                      choiceArray.push(results[i].product_name); 
                  }     
                  // return the item chosen for purchase
                  return choiceArray;
              },
              message: "Which product with its associated item ID would you like to purchase?" 
          },
          // next prompt the user for the quanity of the item 
          {
              name: "amount",
              type: "input",
              message: "How many units of this product would you like to purchase? Enter number of units: "
          }])
          .then(function(answer) {
          // declare a variable to store the selected product for purchase
          var chosenProduct;
          // loop to check the the 2 answers given by the user
          for (var i = 0; i < results.length; i++) {
              // check, if that the selected item exists in our product table
              if (results[i].product_name === answer.product) {
                  chosenProduct = results[i];
              }
          }
          // conditional for the second prompt of whether purchase is successful or unsuccessful
          if (chosenProduct.stock_quantity >= parseInt(answer.amount)) {  
              // update the product's stock quantity when successful purchases are made
              connection.query("UPDATE products SET ? WHERE ?", [
              {
                  // updates the remaining quanity after a purchase has been made (quantity minus amount)
                  stock_quantity: chosenProduct.stock_quantity - parseInt(answer.amount)
              },
              {   
                  // updates the chosen product's id
                  item_id: chosenProduct.item_id
              }], 
              
         
        
    
              
              // Prints whether a purchase has been succesful or unsuccessful
              function(error) {
                  if (error) throw err;
                  console.log("\n\n");
                  // if successful, the below comments print
                  console.log("==============================================");
                  console.log("Product purchased successfully!");
                  console.log("==============================================");
                  console.log("Purchase Summary");
                  console.log("-----------------------------");
                  console.log("Item Name: " +  chosenProduct.product_name);
                  console.log("Item Count: " + parseInt(answer.amount));
                  console.log("-----------------------------");
                  console.log("Total: " + "$" + (chosenProduct.price * parseInt(answer.amount)));
                  console.log("==============================================");
                  console.log("\n\n");
                  // dislays the table view and remaining inventory 
                  
                  updateSales(chosenProduct.product_name,parseInt(answer.amount));
                  display();
                  // after display, it prompts the user to make another purchase
                  run();
              })
          } else {
              // if unsuccesful, the below message will print 
              console.log("==============================================");
              console.log("Insufficient stock.");
              console.log("==============================================");
              display();
              run();
          }
      });
      
  });
};
function updateSales(productName, productSales) {
    connection.query(`UPDATE products SET product_sales=product_sales+${productSales} WHERE product_name='${productName}'`, function(err) {
      if (err) throw err;
    })
}

// call to display customer view
display();
// call to start to purchase process
run();


