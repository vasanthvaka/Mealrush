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

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "https://mealrush.vercel.app", // user panel
  "https://mealrush-f6y7.vercel.app", // admin panel (shortened deployment URL)
  "http://localhost:5173" // dev local
];

// ✅ CORS middleware with dynamic origin checking
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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
