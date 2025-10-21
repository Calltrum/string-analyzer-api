require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stringRoutes = require("./routes/stringRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/strings", stringRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});