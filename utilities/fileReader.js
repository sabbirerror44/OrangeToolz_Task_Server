// const bcrypt = require('bcrypt');
// const {PrismaClient} = require('@prisma/client');
// const prisma = new PrismaClient();
// const createError = require("http-errors");
// const csv = require('csv-parser');
// const fs = require('fs');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const ObjectsToCsv = require('objects-to-csv')



// function fileReader(file){
//     const results = [];
//     fs.createReadStream(`${__dirname}/../public/uploads/files/${file}`)
//     .pipe(csv({}))
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//       const totalUploadedFile = results.length;
//       const output = 
//       results.map(result => {
//         let isnum = /^\d+$/.test(result.number) && result.number.length<=12;
//         if(isnum === true){
//           return result
//         }
//       })
//     const totalProcessedFile = output.filter(function( element ) {
//       return element !== undefined;
//    });
// })
// }


// function fileWriter(file){
//     let count = 0;
//     for(let i=0; i<totalProcessedFile.length; i++){
//      subGroup.push(totalProcessedFile[i]);
//      if((i+1) % Number(split) === 0){
//        count = count + 1;
       
//        const csvWriter = createCsvWriter({
//          path: `${__dirname}/../public/uploads/files/${name}${count}.csv`,
//          header: [
//              {id: 'number', title: 'number'},
//              {id: 'first name', title: 'first name'},
//              {id: 'last name', title: 'last name'},
//              {id: 'email', title: 'email'},
//              {id: 'state', title: 'state'},
//              {id: 'zip', title: 'zip'}
//          ]
//      });
//      const records = subGroup;
 
//      csvWriter.writeRecords(records)       // returns a promise
//      .then(() => {
//          console.log('csv File written successfully');
//      });

//          groups.push(subGroup);
//          subGroup=[];
//            }
//        }
       
//        if(subGroup.length !== 0 && subGroup.length < Number(split)){
//            count = count+1;

//            const csvWriter = createCsvWriter({
//              path: `${__dirname}/../public/uploads/files/${name}${count}.csv`,
//              header: [
//                  {id: 'number', title: 'number'},
//                  {id: 'first name', title: 'first name'},
//                  {id: 'last name', title: 'last name'},
//                  {id: 'email', title: 'email'},
//                  {id: 'state', title: 'state'},
//                  {id: 'zip', title: 'zip'}
//              ]
//          });
//          const records = subGroup;
     
//          csvWriter.writeRecords(records)       // returns a promise
//          .then(() => {
//              console.log('csv File written successfully');
//          });
//            groups.push(subGroup);

//        }
     
//    });
// }


// module.exports = {
//     fileWriter,
//     fileReader
// };