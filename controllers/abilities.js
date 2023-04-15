const Abilities = require("../models/Abilities");


exports.index = function (req, res) {
    Abilities.find({}, function (err, abilities) {
        res.render('abilities/index', { abilities });
    });
};

exports.create = function (req, res) {
    res.render('abilities/create');
};
exports.edit = async function (req, res) {
    const Ability = await Abilities.findById(req.params.id);
    res.render('abilities/edit', { Ability });
};

exports.update = async function (req, res) {
    
    var inputs = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status == 'on' ? true : false
    }
    if (req.hasFile('image')) {
        inputs['image'] = await req.uploadFile('image', 'uploads/');
    }
    Abilities.findByIdAndUpdate(req.params.id,inputs,function(err){
        if (err) {
            console.error(err)
        }
        return true;
    });
    
    req.flash('success', 'Abilities Update');
    res.redirect('back');
};

exports.delete = async function (req, res) {
    Abilities.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.error(err)
        }
        return true;
    });
    req.flash('success', 'Abilities Delete');
    res.redirect('back');
};
exports.store = async function (req, res) {
    var inputs = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status == 'on' ? true : false
    }
    if (req.hasFile('image')) {
        inputs['image'] = await req.uploadFile('image', 'uploads/');
    }
    const AbilitiesCreate = Abilities.create(inputs).then(
        data => {
            
        }
    ).catch(
        error => {
            console.error(error);
        }
    );
    if (AbilitiesCreate){
        req.flash('success', 'Abilities Created');
    }
    res.redirect('/abilities');
};