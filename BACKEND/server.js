import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import calculatorRoutes from "./routes/calculator.routes.js";

dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());


app.use("/api",calculatorRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server Running Successfully at ${PORT}`
    );

});