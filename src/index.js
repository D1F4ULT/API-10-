const express = require('express');
const http = require('http'); // Importamos http para crear el servidor
const { Server } = require('socket.io');
const connectMongoDB = require('./db/mongodb');
const pool = require('./db/mariadb');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Crear el servidor HTTP
const io = new Server(server, { cors: { origin: '*' } }); // Configurar Socket.IO

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

// Conexión a bases de datos
connectMongoDB();
pool.getConnection()
    .then(() => console.log('MariaDB connected'))
    .catch(err => console.error('MariaDB connection error:', err));

// Configuración de WebSockets
io.on('connection', (socket) => {
    console.log('A user connected with Socket.IO');
    
    // Desconexión
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Hacer que Socket.IO esté disponible globalmente
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
