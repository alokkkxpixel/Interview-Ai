const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 3, // 3MB
    }
});

module.exports = upload;