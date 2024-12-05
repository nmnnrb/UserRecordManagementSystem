import multer from "multer";
import path from "path";


// Set up the destination and filename for the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  // Multer middleware configuration
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      // Allow only image files (you can adjust this to other file types)
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      console.log("File Extension:", extname);  // Log the extension
console.log("Mimetype:", mimetype);      // Log the mimetype

      if (mimetype && extname) {
        return cb(null, true); // Accept file
      } else {

        cb(new Error('Only images are allowed'));
      }
    }
  });
  
export default upload