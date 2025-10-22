require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stringRoutes = require("./routes/stringRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/strings", stringRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "String Analyzer API is running!",
        version: "1.0.0",
        endpoints: {
            create: "POST /strings",
            get_one: "GET /strings/:string_value",
            get_all: "GET /strings",
            filter: "GET /strings/filter-by-natural-language?query=...",
            delete: "DELETE /strings/:string_value"
        }
    });
});

app.use("/strings", stringRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: "The requested endpoint does not exist"
    });
});

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occured"
    });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`🌐 local: http:localhost:${PORT}`);
});

module.exports = app;