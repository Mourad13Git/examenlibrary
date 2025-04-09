import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';


app.use(cors({
    origin: '*',  // Permet toutes les origines
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Permet des méthodes spécifiques
    allowedHeaders: ['Content-Type', 'Authorization']  // Autorise certains headers
}));


connectDB();



dotenv.config();

app.use(express.json()); // Pour parser le JSON
app.use('/api', bookRoutes); // Préfixe les routes par /api


mongoose.connect('mongodb://mongo:27017/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur de connexion MongoDB:', err));


app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
});
