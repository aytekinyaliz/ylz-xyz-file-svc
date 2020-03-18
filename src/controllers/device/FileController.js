const { libs:{constants:{HttpStatusCode}}} = require('ylz-xyz-common');

const fileDomainInstance = require('../../domains/FileDomain');

class FileController {
  async upload(req, res, next) {
    try {
      const { projectId } = req.query;

      let file = Object.values(req.files)[0];

      console.log(file);

      if(!file) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Empty file!' });
      }

      await fileDomainInstance.upload({ projectId, file })

      res.status(HttpStatusCode.CREATED).send();
    } catch(err) {
      next(err);
    }
  }

  async query(req, res, next) {
    try {
      const { projectId } = req.query;

      const files = await fileDomainInstance.query({ projectId });

      res.json(files);
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new FileController();