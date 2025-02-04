import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Upload klasörünü oluştur (varsa oluşturmaz)
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Multer yapılandırması (çoklu dosya yükleme)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `image-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları yüklenebilir.'));
    }
  }
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Çoklu resim yükleme endpoint'i
app.post('/api/cars', upload.array('images', 15), async (req, res) => {
  try {
    console.log('Form verileri:', req.body);
    console.log('Yüklenen dosyalar:', req.files);

    if (!req.files || req.files.length === 0) {
      console.log('Resim yüklenmedi.');
      return res.status(400).json({ success: false, message: 'Resim yüklenmedi!' });
    }

    const carsPath = path.join(__dirname, '../src/data/cars.json');

    let carsData = { cars: [] };
    if (fs.existsSync(carsPath)) {
      const fileContent = fs.readFileSync(carsPath, 'utf-8');
      if (fileContent) {
        carsData = JSON.parse(fileContent);
      }
    }

    let features = [];
    try {
      features = JSON.parse(req.body.features || '[]');
    } catch (err) {
      console.error('Features JSON parse hatası:', err);
    }

    // Resimleri sırasıyla "image", "image2", "image3", vb. olarak ayarlıyoruz
    let imageFields = {};
    req.files.forEach((file, index) => {
      imageFields[`image${index + 1}`] = `http://localhost:3001/uploads/${file.filename}`;
    });

    const newCar = {
      id: Date.now(),
      ...req.body,
      features,
      listingDate: new Date().toISOString().split('T')[0],
      ...imageFields // Resim alanları burada ekleniyor
    };

    carsData.cars.push(newCar);
    fs.writeFileSync(carsPath, JSON.stringify(carsData, null, 2));

    console.log('Yeni araç eklendi:', newCar);
    res.json({ success: true, data: newCar });

  } catch (error) {
    console.error('İşlem hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Araç eklenirken hata oluştu', 
      error: error.message, 
      stack: error.stack 
    });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server başlatıldı: http://localhost:${PORT}`);
});
