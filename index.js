const express =require("express") ;
const mongoose =require("mongoose");
const cors =require("cors") ;
const dotenv =require ("dotenv");
const authRoutes =require ("./routes/auth.js");
const userRoutes =require ("./routes/users.js");
const bookRoutes =require ("./routes/books.js");
const transactionRoutes =require ("./routes/transactions.js");
const categoryRoutes =require ("./routes/categories.js");

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

mongoose.set('strictQuery', true);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://vijaybharat:12345@cluster0.orr3sjz.mongodb.net/Library02');
var db = mongoose.connection;
db.on('open', () => console.log('Connected to DB'));
db.on('error', () => console.log('Error occurred'));
