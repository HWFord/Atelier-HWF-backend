const express = require('express');
const database = require('./db');
const cors = require('cors');

//crée application express
const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
}

app.use(cors(corsOptions));

//Get all categories
app.get('/categories', (req, res) => {

  database.query('SELECT * FROM category', (err, result) => {
    if (err) throw err;
    const categories = JSON.stringify(result);
    return res.end(categories, function (err) {
      if (err) throw err;
    });
  });
});

//Get one category
app.get('/category/:categoryID', (req, res) => {
  const categoryID = req.params.categoryID
  database.query(`SELECT * FROM category WHERE ID = '${categoryID}';`, (err, result) => {
    if (err) throw err;
    const categorie = JSON.stringify(result);
    return res.end(categorie, function (err) {
      if (err) throw err;
    });
  });
});

//Get all subcategories
app.get('/category/:categoryID/subcategories', (req, res) => {
  const categoryID = req.params.categoryID

  database.query(`SELECT * FROM subcategory WHERE ID_1 = '${categoryID}';`, (err, result) => {
    if (err) throw err;
    const subcategories = JSON.stringify(result);
    return res.end(subcategories, function (err) {
      if (err) throw err;
    });
  });
});

//Get one subcategory
app.get('/category/:categoryID/subcategory/:subcategoryID', (req, res) => {
  const categoryID = req.params.categoryID
  const subcategoryID = req.params.subcategoryID

  database.query(`SELECT * FROM subcategory WHERE ID = '${subcategoryID}' AND ID_1 = ${categoryID}`, (err, result) => {
    if (err) throw err;
    const subcategorie = JSON.stringify(result);
    return res.end(subcategorie, function (err) {
      if (err) throw err;
    });
  });
});

//Get one subcategory without category
app.get('/subcategory/:subcategoryID', (req, res) => {
  const subcategoryID = req.params.subcategoryID

  database.query(`SELECT * FROM subcategory WHERE ID = '${subcategoryID}'`, (err, result) => {
    if (err) throw err;
    const subcategorie = JSON.stringify(result);
    return res.end(subcategorie, function (err) {
      if (err) throw err;
    });
  });
});

//Get all products
app.get('/subcategory/:subcategoryID/products', (req, res) => {
  const subcategoryID = req.params.subcategoryID

  database.query(
    `SELECT product.*, category.ID as categoryID, category.name as categoryName
    FROM product 
    INNER JOIN subcategory 
    ON subcategory.ID = product.ID_1
    INNER JOIN category 
    ON subcategory.ID_1 = category.ID
    WHERE subcategory.ID = ${subcategoryID};`
    , (err, result) => {
      if (err) throw err;
      const products = JSON.stringify(result);
      return res.end(products, function (err) {
        if (err) throw err;
      });
    });
});

//Get One product
app.get('/product/:productID', (req, res) => {
  const productID = req.params.productID

  database.query(`SELECT * FROM product WHERE ID = '${productID}'`, (err, result) => {
    if (err) throw err;
    const product = JSON.stringify(result);
    return res.end(product, function (err) {
      if (err) throw err;
    });
  });
});

//Add product to user basket
app.post('/:userID/basketAdd/:productID', (req, res) => {
  const userID = req.params.productID
  const productID = req.params.productID

  database.query(
    ` INSERT INTO hasproductsinbasket ('ID', 'ID_1') VALUES (${userID},${productID}) `
  //   , (err, result) => {
  //   if (err) throw err;
    
  //   result.send(product, function (err));
  //   res.send(product)
  // }
  );
});


module.exports = app;