const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// 1. Cargar configuración del archivo .env
dotenv.config();

const app = express();

// 2. Middlewares (Puentes de comunicación)
app.use(cors());
app.use(express.json());

// 3. Servir archivos estáticos (CSS, JS, Imágenes)
// Importante: Esto busca la carpeta "public" en la raíz de tu proyecto
app.use(express.static(path.join(__dirname, 'public')));

// 4. Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

// Verificación de seguridad para evitar errores de conexión
if (!MONGO_URI) {
    console.error('❌ ERROR: No se encontró MONGO_URI en las variables de entorno.');
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conexión exitosa a MongoDB Atlas');
    })
    .catch(err => {
        console.error('❌ Error crítico al conectar a MongoDB:', err.message);
    });

// 5. Rutas de la API (Tus datos)
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: "Hola desde el servidor de la tienda" });
});

// 6. RUTA MAESTRA (Soluciona el "Cannot GET /")
// Esta línea le dice al servidor: "Si no es una ruta de API, entrega el HTML principal"
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 7. Encender el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
    console.log(`📂 Canal de comunicación abierto con la carpeta: public`);
});