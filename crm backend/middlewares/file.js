// // const multer=require('multer');

// // const storage=multer.diskStorage({
// //     destination:(req,file,cb)=>
// //         {
// //             cb(null,'./images/')
// //         },
// //     filename:(req,file,cb)=>
// //             {
// //                 cb(null,file.originalname)
// //             }
// // })
// // const upload=multer({storage:storage})
// // module.exports=upload

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');




// // Define the upload directory
// const uploadDir = path.join(__dirname, 'uploads');

// // Create the directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'images', // Cloudinary folder name
//       format: async (req, file) => 'jpg', // supports promises as well
//       public_id: (req, file) => 'computed-filename-using-request', // Define a custom public ID if needed
//     },
//   });


// // Create multer instance
// const upload = multer({ storage: storage });

// module.exports = upload;





const multer= require('multer');

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload= multer({storage:storage});

module.exports=upload;