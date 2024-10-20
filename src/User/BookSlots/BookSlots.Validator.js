import { cloudinary } from "../../index.js";



export const uploadFile = async (filePath, sessionId, studenUsercode) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',  // Automatically detects file type
            folder: `session_materials_${studenUsercode}`, // You can specify a folder in your Cloudinary account
            public_id: `session_materials_${studenUsercode}_${sessionId}_${Date.now()}`,
            display_name: `${sessionId}_${Date.now()}`,
            format:'pdf'
        });

        // After the file is uploaded, you can store the result in the database or return it
     
        const formatArray = result.public_id.split('.')
        // Return the uploaded file's URL or any other relevant info
        return {
            message: 'File uploaded successfully',
            url: result.secure_url,  // Cloudinary's secure URL of the uploaded file
            public_id: result.public_id,  // Public ID for further reference
            display_name: result.display_name,
            format: formatArray[formatArray.length-1]
        };
    } catch (error) {
        console.log(error)
    }

};