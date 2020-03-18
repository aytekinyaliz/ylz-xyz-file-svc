const firebucket = require('../services/firebucket');

const config = require('../config');

class FileRepository {
  // async get(id) {
  //   const device = await this.devicesCollection.doc(id).get();
  
  //   return device.data();
  // }

  async getAll() {
    const [files] = await firebucket.getFiles();

    return files.map(file => file.name);
  }
  
  async upload({ projectId, file }) {
    const fileName = `${projectId}_${Date.now()}_${file.name}`;

    return new Promise((resolve, reject) => {
      var newFile = firebucket.file(fileName);

      newFile.save(file.data, {
        metadata: {
          contentType: file.mimetype
        }}, (err, url) => {
          if(err) {
            console.log('Error while upload:', err);
            return reject('Something is wrong! Unable to upload at the moment.');
          }

          resolve(`https://firebasestorage.googleapis.com/v0/b/${'ylz-xyz-infra2'}/o/${(encodeURI(config.storageBucket)).replace("\/", "%2F")}`);
        }
      );
    });
  }
}

module.exports = new FileRepository();



// return new Promise((resolve, reject) => {
//   if (!file) {
//     reject('No image file');
//   }

//   let fileUpload = firebucket.file(fileName);

//   const blobStream = fileUpload.createWriteStream({
//     metadata: {
//       contentType: file.mimetype
//     }
//   });

//   blobStream.on('error', (error) => {
//     console.log(error);
//     reject('Something is wrong! Unable to upload at the moment.');
//   });

//   blobStream.on('finish', () => {

//     console.log(fileUpload.name)
//     // The public URL can be used to directly access the file via HTTP.
//     // const url = format(`https://firebasestorage.googleapis.com/v0/b/${'ylz-xyz-infra2'}/o/${(encodeURI(fileUpload.name)).replace("\/", "%2F")}`);
//     // resolve(url);
//     resolve();
//   });

//   blobStream.end(file.data);
// });