import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS middleware with wildcard Vercel handling
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or curl
    const allowed = [
      "https://mealrush.vercel.app",
      "http://localhost:5173"
    ];
    const isAllowed = allowed.includes(origin) || origin.endsWith(".vercel.app");
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Middlewares
app.use(express.json());

// ✅ DB connection
connectDB();

// ✅ API routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ Start server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
