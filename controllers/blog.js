var slug = require('slug')
var jwt = require('jsonwebtoken');
const sharp = require("sharp");

exports.index = async function (req, res) {
 
    var fs = require('fs');
    fs.readFile('blogs.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {

            var obj = []

            console.log(data);
            obj = data ? JSON.parse(data) : obj; //now it an object
            var counter = 0;
            while (counter < obj.length) {
                obj[counter].title_slug = slug(obj[counter].title);
                obj[counter].date_time = new Date(parseInt(obj[counter].date_time)).toISOString();
                counter++
            }
            res.send({
                success: true,
                data: obj
            });
        }
    });
    
    
};

exports.store = async function (req, res) {
    
    var fs = require('fs');
    fs.readFile('blogs.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {

            var obj = []
            
            console.log(data);
            obj = data ? JSON.parse(data) : obj; //now it an object
            var main_image = req.uploadFile('main_image')
            var additional_images = req.uploadFile('additional_images')
            main_image.map(function(v,i){ // resize image
                resizeImage(v);
            })
            additional_images.map(function (v, i) {
                resizeImage(v);
            })
            Blog = {
                reference: obj[obj.length - 1]?.reference + 1,
                title: req.body.title,
                description: req.body.description,
                main_image: main_image,
                additional_images: additional_images,
                date_time: req.body.date_time,
            };
            obj.push(Blog); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('blogs.json', json, 'utf8', function (err, data){
                console.log(err);
            }); // write it back 
            res.send({
                success: true,
                data: Blog
            });
        }
    });
    

};

exports.imageToken = async function (req, res) {

    var image = req.query.path;
    var imageToken = jwt.sign({ image }, 'salt', {expiresIn: '5m'});
    
    res.send({
        success: true,
        data: imageToken
    });

};

exports.getImage = async function (req, res) {

    
    try {
        const data = jwt.verify(req.query.token, 'salt');
        res.sendFile(data.image, { root: '.' });
      
    } catch (error) {
        res.send({
            success: false,
            data: error
        });
    }
   

};



async function resizeImage(imagePath,per=25) {
    try {
        const metadata = await sharp('images/' + imagePath).metadata();
        console.log(metadata, metadata.width * ((100 - per) / 100));
        await sharp('images/' + imagePath)
            .resize({
                width: parseInt(metadata.width * ((100-per)/100)),
                height: parseInt(metadata.height * ((100-per) / 100))
            })
            .toFile('images/resize-' + imagePath);
    } catch (error) {
        console.log(error);
    }
}


