
const fs = require("fs");
const Str = require("./Str");
const Upload = function (req, path,filename='') {
    console.log("request OBJ from upload" ,req.files);
    req.files.each
    // fs.rename(oldPath, newPath, function (err) {
    //     if (err) throw err
    //     console.log('Successfully renamed - AKA moved!')
    // })
};

module.exports = Upload;