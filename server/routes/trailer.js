import express from 'express';
import multer from 'multer';
import validations from '../middlewares/validations/trailer';
import trailer from '../controllers/trailer';

const router = express.Router();

// storage definition (destination and filename setting)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

// image uploading by multer
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 kb maximum
  },
});

// image fields definition and structure
const field = [{
  name: 'landscape',
  maxCount: 1,
},
{
  name: 'portrait',
  maxCount: 8,
}];

router.route('/trailer')
  .get(trailer.getTrailer);


router.route('/add')
  .post(upload.fields(field), validations.inputValidation, trailer.addTrailer);

export default router;
