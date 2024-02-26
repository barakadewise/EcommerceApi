import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads/', // Define the destination directory where uploaded files will be stored
    filename: (req, file, callback) => {
      // Generate a unique filename by adding a timestamp and the original extension
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};
