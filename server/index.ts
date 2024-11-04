import express from "express";
import employeesRouter from "./routes/employees";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // Allow all origins to post
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  })
);
app.use(express.json());
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

app.use("/api/employees", employeesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
