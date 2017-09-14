var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require ("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
});

//disply the table and items
function displayTable (){
  connection.query('SELECT * from products', function (error, results, fields) {
    if (error) throw error;

        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', "Stock"]
        });

        results.forEach(function (columns) {
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
         var obj = new Object;
         obj[columns.item_id] = [columns.product_name, columns.department_name, "$"+columns.price, columns.stock_quantity];
         table.push(obj);
        });
        console.log(table.toString());
        selectItem(); //prompt function
      });
}

// function to ask user what Item the wish to buy
function selectItem(){
    inquirer.prompt([
      	{
      		type: "input",
      		name: "itemID",
      		message: "Please enter an item-id you would like to purchase?",
      	},
      	{
      		type: "input",
      		name: "quantity",
      		message: "How many items would you like to buy?",
      	}

      	]).then(function(response){
          connection.query('SELECT * FROM products WHERE item_id = ? ', [parseInt(response.itemID)], function (err, ress) {
            if (err) throw err;
              if (ress[0].stock_quantity >= parseInt(response.quantity)){
                 var newStock = ress[0].stock_quantity - parseInt(response.quantity);
                 var sale = parseFloat(response.quantity)*ress[0].price;
                 updateTable(newStock, sale, parseInt(response.itemID));
              }
              else if (ress[0].stock_quantity < parseInt(response.quantity)){
                 console.log("not enough item on stock!!!");
              }
          });
  	});
}

function updateTable (newStock,sale,id){
  connection.query('UPDATE products SET stock_quantity = ?, product_sale = ? WHERE item_id = ? ',[newStock, sale, id], function (errors, result) {
    if (errors) throw errors;
    //if there isnt enough inventory diaply message then rerun displayTable
    console.log("database updated ");
    displayTable();
  });
  //after table updates rerun displayTable
  displayTable();
}
// run the start function when the file is loaded to prompt the user
displayTable();

///ONUR
//
// var mysql = require ("mysql");
// var inquirer = require ("inquirer");
// var Table = require ("cli-table");
//
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'bamazondb'
// });
//
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//
//   console.log('connected as id ' + connection.threadId);
// });
//
// function displayTable (){
//   connection.query('SELECT * from products', function (error, results, fields) {
//     if (error) throw error;
//
//         var table = new Table({
//             head: ['Item ID', 'Product Name', 'Department Name', 'Price', "Stock"]
//         });
//
//         results.forEach(function (columns) {
//         // table is an Array, so you can `push`, `unshift`, `splice` and friends
//          var obj = new Object;
//          obj[columns.item_id] = [columns.product_name, columns.department_name, "$"+columns.price, columns.stock];
//          table.push(obj);
//         });
//         console.log(table.toString());
//         selectItem(); //prompt function
//       });
// }

//
//
//
//
// function selectItem(){
//     inquirer.prompt([
//       	{
//       		type: "input",
//       		name: "itemID",
//       		message: "Please enter an item-id you would like to purchase?",
//       	},
//       	{
//       		type: "input",
//       		name: "quantity",
//       		message: "How many items would you like to buy?",
//       	}
//
//       	]).then(function(response){
//
//           connection.query('SELECT * from products where item_id = ? ', [parseInt(response.itemID)], function (err, reso) {
//             if (err) throw err;
//               if (reso[0].stock >= parseInt(response.quantity)){
//                  var newStock = reso[0].stock - parseInt(response.quantity);
//                  var sale = parseFloat(response.quantity)*reso[0].price;
//                  updateTable(newStock, sale, parseInt(response.itemID));
//               }
//               else if (reso[0].stock < parseInt(response.quantity)){
//                  console.log("not enough item on stock!!!");
//               }
//           }); // close query function
//
//   	}); //close first inquirer then funciton
// }
//
// //first display all items to buyer and then prompt options
// displayTable();
//
// //
//
// function updateTable (newStock,sale,id){
//   connection.query('UPDATE products SET stock = ?, product_sale = ? WHERE item_id = ? ',[newStock, sale, id], function (errors, result) {
//     if (errors) throw errors;
//     console.log("database updated ");
//   });
// }
