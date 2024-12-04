const Genetic = require('../models/Genetics'); 

// Getting all genetics

exports.getallGenetics = async (req,res) => {
    // Finds all genetics tied to the users ID
    try {
        const recentGenetics = await Genetic.find({user: req.user._id}).sort({date: -1})
        res.render('inventory/genetics-inventory',{
            recentGenetics,
            name: req.user.name    
        });
    } catch (err) {
        console.error(err);
        res.redirect('/inventory');
    }

}

// adding new genetics
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

// Deleting Genetics 
exports.deleteGenetic = async (req,res) => {
    console.log(req.params.id)
    try{
        await Genetic.findByIdAndDelete(req.params.id)
        res.status(200).send('Deleted Successfully')
    }catch (err){
        res.status(500).send('Server request failed, Error Deleting')
    }
}

// Updating Genetics

exports.updateGenetic = async (req,res) => {
    const { species, strain, isolation, quantity } = req.body;
    // console.log(species)
    try{
        await Genetic.findByIdAndUpdate(req.params.id,{
            species,
            strain,
            isolation,
            quantity
        })
        res.status(200).json({message: 'Genetic data updated successfully'})
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update genetic data' });
    }
}