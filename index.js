const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const categoryRouter = require('./routes/categories');
const tasksRouter = require('./routes/tasks');
const multer = require('multer')
const cors = require('cors')
const path = require('path')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.DB_URI, () => {
    console.log('Database connection established');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({
    storage: storage
})

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File uploaded successfully.")
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});

app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/tasks', tasksRouter);