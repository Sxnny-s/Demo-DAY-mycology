const Genetic = require('../models/Genetics'); 
const Lab = require('../models/Lab');

// ----------------- Create Operations -----------------
// Adding new genetics
exports.createGenetic = async (req, res) => {
    const { type, species, strain, isolation, quantity } = req.body;
    const newGenetic = new Genetic({
        type,
        species,
        strain,
        isolation,
        quantity,
        user: req.user._id
    });

    try {
        await newGenetic.save();
        res.redirect('/inventory');
    } catch (err) {
        console.error(err);
        res.redirect('/inventory/genetic-inventory/new');
    }
};

// Adding new lab equipment
exports.createEquipment = async (req, res) => {
    const { item, quantity, price, purchaseDate } = req.body;
    const newLab = new Lab({
        item,
        quantity,
        price,
        user: req.user._id
    });

    try {
        await newLab.save();
        res.redirect('/inventory');
    } catch (err) {
        console.error(err);
        res.redirect('/inventory/equipment/new');
    }
};

// ----------------- Read Operations -----------------
// Getting Main Inventory Page
exports.getMainPage = (req, res) => {
    res.render('inventory/inventory'); 
};

// Getting add new genetics form
exports.getNewGeneticForm = (req, res) => {
    res.render('inventory/newGenetics'); 
};
// Getting add new lab equipment form 
exports.getNewLabForm = (req, res) => {
    res.render('inventory/newEquipment'); 
};



// Getting all genetics
exports.getallGenetics = async (req, res) => {
    try {
        const recentGenetics = await Genetic.find({ user: req.user._id }).sort({ date: -1 });
        res.render('inventory/genetics-inventory', {
            recentGenetics,
            name: req.user.name
        });
    } catch (err) {
        console.error(err);
        res.redirect('/inventory');
    }
};


// Viewing all lab equipment
exports.getAllEquipment = async (req, res) => {
    try {
        const recentEquipment = await Lab.find({ user: req.user._id }).sort({ date: -1 });
        res.render('inventory/equipment', {
            recentEquipment,
            name: req.user.name
        });
    } catch (err) {
        console.error(err);
        res.redirect('/inventory');
    }
};

// ----------------- Update Operations -----------------
// Updating genetics
exports.updateGenetic = async (req, res) => {
    const { species, strain, isolation, quantity } = req.body;

    try {
        await Genetic.findByIdAndUpdate(req.params.id, {
            species,
            strain,
            isolation,
            quantity
        });
        res.status(200).json({ message: 'Genetic data updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update genetic data' });
    }
};

// Updating inventory
exports.updateLab = async (req, res) => {
    const {item, quantity, price, purchaseDate} = req.body

    try {
        await Lab.findByIdAndUpdate(req.params.id, {
            item,
            quantity,
            price,
            purchaseDate,
            user: req.user._id
            
        });
        res.status(200).json({message: 'Lab data updated successfully'});
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update lab data' });
    }
}

// ----------------- Delete Operations -----------------
// Deleting genetics
exports.deleteGenetic = async (req, res) => {
    try {
        await Genetic.findByIdAndDelete(req.params.id);
        res.status(200).send('Deleted Successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server request failed, Error Deleting');
    }
};

// Deleting lab equipment
exports.deleteLab = async (req, res) => {
    try {
        await Lab.findByIdAndDelete(req.params.id);
        res.status(200).send('Deleted Successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server request failed, Error Deleting');
    }
};
