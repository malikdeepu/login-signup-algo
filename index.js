const express = require("express");
const app = express();
const cors = require("cors");
const port = 3002;
app.use(express.json());
app.use(cors());
var user = [];
var seller = [];
var products = [];
var purchased = [];
var wishlist = [];
var cart = [];

app.post("/signup", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;
  var name = req.body.name;
  var email = req.body.email;
  var add = req.body.add;
  var country = req.body.country;
  var dummy = {
    id: id,
    pass: pass,
    name: name,
    email: email,
    add: add,
    country: country,
    purchased: [],
    wishlist: [],
    cart: [],
  };
  user.push(dummy);
  console.log(user);
  res.json({ users: user });
});

app.post("/login", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;

  console.log({ id, pass });

  for (let i = 0; i < user.length; i++) {
    if (user[i].id == id)
      if (user[i].pass == pass) {
        res.json({
          message: "login successful",
          name: user[i].name,
          email: user[i].email,
          add: user[i].add,
          country: user[i].country,
        });
        return;
      } else {
        res.json({ message: "login fail" });
      }
  }

  res.json({ message: "user not found " });
});

app.post("/newpass", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;
  var newpass = req.body.newpass;
  console.log({ id, pass, newpass });

  for (let i = 0; i < user.length; i++) {
    if (user[i].id == id)
      if (user[i].pass == pass) {
        user[i].pass = newpass;
        return res.json({
          message: "login data fetched",
          id: user[i].id,
          pass: user[i].pass,
        });
      } else {
        res.json({ message: "login fail" });
      }
  }

  res.json({ message: "user not found " });
});

app.post("/sellersignup", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;
  var name = req.body.name;
  var email = req.body.email;
  var add = req.body.add;
  var country = req.body.country;
  var dummy = {
    id: id,
    pass: pass,
    name: name,
    email: email,
    add: add,
    country: country,
  };
  seller.push(dummy);
  console.log(seller);
  res.json({ seller: seller });
});

app.post("/sellerlogin", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;

  console.log({ id, pass });

  for (let i = 0; i < seller.length; i++) {
    if (seller[i].id == id)
      if (seller[i].pass == pass) {
        res.json({
          message: "login successful",
          name: seller[i].name,
          email: seller[i].email,
          add: seller[i].add,
          country: seller[i].country,
        });
        return;
      } else {
        res.json({ message: "login fail" });
      }
  }

  res.json({ message: "seller not found " });
});

app.post("/products", (req, res) => {
  var proid = req.body.proid;
  var img = req.body.img;
  var product = req.body.product;
  var rate = req.body.rate;
  var details = req.body.details;
  var review = req.body.review;

  var prodummy = {
    proid: proid,
    img: img,
    product: product,
    rate: rate,
    review: review,
    details: details,
  };
  products.push(prodummy);
  console.log(products);
  res.send({ products: products });
});

app.get("/getproduct", (req, res) => {
  res.json(products);
});

app.post("/purchased", (req, res) => {
  var proid = req.body.proid;

  console.log({ proid });

  for (let i = 0; i < products.length; i++) {
    if (products[i].proid == proid) {
      purchased.push(products[i]);
      return res.json(purchased);
    }
  }

  res.json({ message: "product not found " });
});

app.post("/wishlist", (req, res) => {
  var proid = req.body.proid;

  console.log({ proid });

  for (let i = 0; i < products.length; i++) {
    if (products[i].proid == proid) {
      wishlist.push(products[i]);
      return res.json(wishlist);
    }
  }

  res.json({ message: "product not found " });
});
app.post("/cart", (req, res) => {
  var proid = req.body.proid;

  console.log({ proid });

  for (let i = 0; i < products.length; i++) {
    if (products[i].proid == proid) {
      cart.push(products[i]);
      return res.json(cart);
    }
  }

  res.json({ message: "product not found " });
});

app.post("/peruserpurchased", (req, res) => {
  const id = req.body.id;
  const pass = req.body.pass;
  const proid = req.body.proid;

  console.log({ id, pass, proid });

  for (let i = 0; i < user.length; i++) {
    if (user[i].id === id && user[i].pass === pass) {
      for (let j = 0; j < products.length; j++) {
        if (products[j].proid === proid) {
          user[i].purchased.push(products[j]);
          return res.json(user);
        }
      }
      return res.json({ message: "Product not found" });
    }
  }

  res.json({ message: "Login failed" });
});

app.post("/peruserwishlist", (req, res) => {
  const id = req.body.id;
  const pass = req.body.pass;
  const proid = req.body.proid;

  console.log({ id, pass });

  for (let i = 0; i < user.length; i++) {
    if (user[i].id === id && user[i].pass === pass) {
      for (let j = 0; j < products.length; j++) {
        if (products[j].proid === proid) {
          wishlist.push(products[j]);
          return res.json({
            wishlist: wishlist,
            message: "Login successful",
            name: user[i].name,
            email: user[i].email,
            add: user[i].add,
            country: user[i].country,
          });
        }
      }
      return res.json({ message: "Product not found" });
    }
  }

  res.json({ message: "Login failed" });
});

app.post("/perusercart", (req, res) => {
  const id = req.body.id;
  const pass = req.body.pass;
  const proid = req.body.proid;

  console.log({ id, pass });

  for (let i = 0; i < user.length; i++) {
    if (user[i].id === id && user[i].pass === pass) {
      for (let j = 0; j < products.length; j++) {
        if (products[j].proid === proid) {
          cart.push(products[j]);
          return res.json({
            cart: cart,
            message: "Login successful",
            name: user[i].name,
            email: user[i].email,
            add: user[i].add,
            country: user[i].country,
          });
        }
      }
      return res.json({ message: "Product not found" });
    }
  }

  res.json({ message: "Login failed" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
