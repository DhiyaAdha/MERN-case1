import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3200;
app.use(cors());

// Fungsi untuk membaca file JSON dan mengembalikan data yang diparsing
const getData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return []; // Mengembalikan array kosong jika ada kesalahan
  }
};

// Rute untuk /banner
app.get("/banner", (req, res) => {
  const data = getData("./data/Banner.json");
  res.json(data);
});

// Rute untuk /categry
app.get("/category", (req, res) => {
  const data = getData("./data/Category.json");
  res.json(data);
});

// Rute untuk /product
app.get("/product", (req, res) => {
  const data = getData("./data/Product.json");
  res.json(data);
});
app.get("/product/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const data = findData(id);
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

const findData = (id) => {
    const dataProduct = getData("./data/Product.json");
    const findProduct = dataProduct.find((data) => data.id === id);
    return findProduct;
}

app.listen(port, () => console.log(`Server is running on port: ${port}`));
