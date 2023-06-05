const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/upload'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now().toString(32) + Math.random().toString(16).slice(-6) + ext;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const whiteList = ['.git', '.jpg', '.png','.jpeg'];
    const ext = path.extname(file.originalname);
    if (whiteList.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('文件类型不一致'));
    }
  },
});

router.post('/', (req, res) => {
  upload.single('img')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // 处理 Multer 相关错误
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(500).json({
            code: 500,
            msg: '文件体积太大',
            data: null,
          });
        }
      }
      // 记录错误日志
      return res.status(500).json({
        code: 500,
        msg: '文件上传失败',
        data: null,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        code: 400,
        msg: '未上传文件',
        data: null,
      });
    }

    // 文件上传成功，返回文件路径
    const basePath = '/upload'; // 基础路径，可以根据需要进行配置
    const filePath = `${basePath}/${req.file.filename}`;
    res.status(200).json({
      code: 200,
      msg: '文件上传成功',
      data: filePath,
    });
  });
});

module.exports = router;
