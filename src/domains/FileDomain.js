const fileRepositoryInstance = require('../repositories/FileRepository');


class FileDomain {
  async query({ projectId }) {
    const files = await fileRepositoryInstance.getAll();

    if(projectId === '*') {
      return files;
    }

    const result = [];
    files.forEach(file => {
      if(file.indexOf(projectId + '_') === 0) {
        result.push(file);
      }
    });

    return result;
  }

  async upload({ projectId, file }) {
    return await fileRepositoryInstance.upload({ projectId, file });
  }
}

module.exports = new FileDomain();
