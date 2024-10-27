const BlacklistedEmail = require('../models/BlacklistedEmail');
const pool = require('../db/mariadb');

// Función para validar formato de correo electrónico
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

exports.verifyEmail = async (req, res) => {
    const { email } = req.body;
    const io = req.app.get('io'); // Obtener instancia de Socket.IO

    if (!isValidEmail(email)) {
        io.emit('emailVerification', { email, status: 'invalid format' }); // Emitir evento de email inválido
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const blacklisted = await BlacklistedEmail.findOne({ email });
        if (blacklisted) {
            io.emit('emailVerification', { email, status: 'blacklisted' }); // Emitir evento de email en lista negra
            return res.status(403).json({ message: 'Email is blacklisted' });
        }

        // Almacenar registro de verificación en MariaDB (auditoría)
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO email_audits (email, status) VALUES (?, ?)', [email, 'verified']);
        connection.release();

        io.emit('emailVerification', { email, status: 'verified' }); // Emitir evento de email verificado

        res.json({ message: 'Email is valid' });
    } catch (error) {
        io.emit('emailVerification', { email, status: 'error' }); // Emitir evento de error
        res.status(500).json({ error: 'Server error during verification' });
    }
};
