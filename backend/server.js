import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST']
}));

app.use(express.json());

// Test endpoint'i - bağlantıyı kontrol için
app.get('/test', (req, res) => {
  console.log('Test isteği alındı');
  res.json({ message: 'Server çalışıyor' });
});

app.post('/api/cars', (req, res) => {
  try {
    const carsPath = path.join(__dirname, '../src/data/cars.json');
    console.log('Cars.json yolu:', carsPath);
    
    const carsData = JSON.parse(fs.readFileSync(carsPath));
    const newCar = req.body;
    
    carsData.cars.push(newCar);
    fs.writeFileSync(carsPath, JSON.stringify(carsData, null, 2));
    
    console.log('Yeni araç eklendi:', newCar);
    res.json({ success: true });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Araç eklenirken hata oluştu' });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server başlatıldı: http://localhost:${PORT}`);
  console.log('CORS origin:', 'http://localhost:5173');
});