
const Genetic = require('../models/Genetics'); 


exports.createGenetic = async (req, res) => {
    const {type, species, strain, isolation, quantity} = req.body
    console.log(req.user);
    // making logging entries form genetic form
    const newGenetic = new Genetic({
        type,
        species,
        strain,
        isolation,
        quantity,
        user: req.user._id
    })

    // adding form to database
    try{
        await newGenetic.save();
        res.redirect('/inventory')
    }catch(err){
        console.error(err)
        res.redirect('/inventory/genetic-inventory/new')
    }
}