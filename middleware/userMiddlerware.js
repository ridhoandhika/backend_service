const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authMiddleware = async (req, res, next) => {
    try {
        // Validasi header request
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: false,
                error: "Unauthorized"
            });
        }

        // Validasi access token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    error: "Access token expired",
                    message: "Token has expired"
                });
            }
            return res.status(401).json({
                error: "Access token invalid",
                message: err.message
            });
        }

        // Dapatkan data user dari JWT
        const user = await User.findByPk(decoded.id);
        
        if (!user) {
            return res.status(404).json({
                status: false,
                error: "User not found"
            });
        }

        // Tambahkan data user ke objek req
        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};
