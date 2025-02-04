import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Upload klasörü kontrolü
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Multer yapılandırması
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Sadece resim dosyalarını kabul et
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
    }
    cb(null, true);
  }
});

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Test endpoint
app.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Server çalışıyor' });
});

app.post('/api/cars', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 }
]), async (req, res) => {
  try {
    const carsPath = path.join(__dirname, '../src/data/cars.json');
    const carsData = JSON.parse(fs.readFileSync(carsPath));
    
    const newCar = {
      id: Date.now(),
      ...req.body,
      features: JSON.parse(req.body.features || '[]'),
      images: Object.values(req.files || {}).map(file => file[0].path)
    };

    carsData.cars.push(newCar);
    fs.writeFileSync(carsPath, JSON.stringify(carsData, null, 2));

    res.json({ success: true, data: newCar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server başlatıldı: http://localhost:${PORT}`);
  console.log('CORS origin:', 'http://localhost:5173');
});