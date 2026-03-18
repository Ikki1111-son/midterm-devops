const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const validators = require('../validators/productValidator');
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safeName =
      Date.now() +
      '-' +
      file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, safeName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
});

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', upload.single('imageFile'), validators.create, handleValidation, controller.create);
router.put('/:id', upload.single('imageFile'), validators.put, handleValidation, controller.put);
router.patch('/:id', upload.single('imageFile'), validators.patch, handleValidation, controller.patch);
router.delete('/:id', controller.remove);

module.exports = router;