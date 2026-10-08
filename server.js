require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./config/passport");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const errorHandler = require("./middleware/errorHandler");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

const app = express();

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        }),

        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Corbin's CSE341 Project2 and Task Management API",
        documentation: "/api-docs",
        login: "/auth/google",
        projects: "/projects",
        tasks: "/tasks"
    });
});

// Authentication routes
app.use("/auth", authRoutes);

// API routes
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

// Swagger documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
