import formidable, { errors as formidableErrors } from 'formidable';

const ALLOWED_MIMETYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
];

const filterFiles = (file) => {
    return ALLOWED_MIMETYPES.includes(file.mimetype);
};


const parseForm = (req, options) => {
    const form = formidable(options);

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
};

export const fileuploadMiddleware = async (req, res, next) => {
    try {
        const { fields, files } = await parseForm(req, {
            multiples: false,
            filter: filterFiles,
        });

   
        for (const [key, value] of Object.entries(fields)) {
            
            if (Array.isArray(value)) {
                req.body[key] =  value[0] 
            } else {
               
                req.body[key] =  value
            }
        }

        // console.log(files, "files")
        req.files =  files;

        next();
    } catch (error) {
        console.error('Error in file upload middleware:', error);
        next(error); 
    }
};