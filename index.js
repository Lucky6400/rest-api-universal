const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');
const cors = require('cors')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, () => {
    console.log('Database connection established');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});

app.use('/api', authRouter);
app.use('/api/projects', projectsRouter);