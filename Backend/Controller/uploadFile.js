import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import storage from '../Config/firebase.js';

const Uploadrouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

Uploadrouter.post('/', upload.array('files', 100), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      res.status(400).json({ message: 'Please upload one or more files' });
      return;
    }

    const publicUrls = [];

    for (const file of files) {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
      const blob = storage.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (error) => {
        console.error('Error uploading file:', error.message);
        res.status(400).json({ message: 'Error uploading file' });
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
        publicUrls.push(publicUrl);

        // Nếu đã upload hết tất cả các tệp, trả về danh sách các URL công khai
        if (publicUrls.length === files.length) {
          res.status(200).json(publicUrls);
        }
      });

      blobStream.end(file.buffer);
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({ message: 'Error uploading files' });
  }
});

export default Uploadrouter;
