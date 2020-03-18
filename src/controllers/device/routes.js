const { Router } = require('express');
const { authLevel, authMiddleware } = require('ylz-xyz-auth-mdw');
const Multer = require('multer');

const fileControllerInstance = require('./FileController');

const router = Router();

router.route('/query').get(
  authMiddleware(authLevel.private),
  fileControllerInstance.query
);

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 30 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//   }
// });

router.route('/').post(
  authMiddleware(authLevel.private),
  // multer.single('file'),
  fileControllerInstance.upload
);

module.exports = router;