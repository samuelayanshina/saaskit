import express from "express";
import cors from "cors";
import stripeRoutes from "./routes/stripe";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/stripe", stripeRoutes);

export default app;
