import multer from "multer";
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // Destination folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext); // Use the original file name for the uploaded file
    }
});

const upload = multer({ storage: storage });

export default upload