// index.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

// All user routes
app.use("/api", userRoutes);

// ✅ Use 5000 for backend, not 3306
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
