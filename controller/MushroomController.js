const newGrow = require('../models/newGrow')

// ----------------- Read Operations -----------------

// Getting Main Grow Page
exports.getIndexPage = (req, res) => {
    res.render('grow-log/index') 
}

// Getting new grow log form
exports.getNewGrowForm = (req,res) => {
    res.render('grow-log/new')
}

// getting view all grows page
exports.getAllGrowsPage = async (req,res) => { 
    const stages = ['inoculation', 'full colonization', 'spawned', 'primordia', 'pins', 'fruiting', 'harvest'];

    try {
        const grows = await newGrow.find({ user: req.user._id, status: 'active' })
        res.render('grow-log/all',{
            grows,
            stages
        })
    } catch (error) {
        console.error('Error fetching grows:', error);

    }
}

// Getting completed grows page
exports.getCompletedGrow = async (req, res) => {
     try {
        const grows = await newGrow.find({user: req.user._id, status: 'completed' })
        console.log(grows)
         res.render('grow-log/completedGrows',{
            grows
         });
     } catch (err) {
        
     }
};


// ----------------- Create Operations -----------------

// Create new grow object
exports.startGrow = async (req,res) => {
    const {tek,species,strain,generation,contamination,substrateType,grainType,substrateDepth} = req.body
    const freshGrow = new newGrow({
        tek,
        species,
        strain,
        generation,
        contamination,
        substrateType,
        grainType,
        substrateDepth,
        user: req.user._id
    })
    console.log(freshGrow)
    try {
        await freshGrow.save();
        res.redirect('/grow-log')
    } catch (err) {
        console.error(err)
        res.redirect('/grow-log/new')
    }
}


// ----------------- Update Operations -----------------
// Udateing stages 
exports.updateStage = async (req, res) => {
   const { id: growid } = req.params;

   try {
    const grow = await newGrow.findById(growid) 

    const currentStage = grow.stages.findIndex(stage => stage.isCurrent === true)
    console.log(currentStage) 
    console.log(grow.stages)
    // setting current stage to false
    grow.stages[currentStage].isCurrent = false
    // Settting the next stage to true
    grow.stages[currentStage + 1].isCurrent = true
    // Setting the date of the next stage to the current date
    grow.stages[currentStage + 1].date = new Date()
    await grow.save();
    return res.status(200).json({ message: 'Stage updated successfully', grow:grow });

   } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Server Error'})
   }
     
}

// updating wet weight
exports.updateGrowWeight = async (req, res) => {
    const growid = req.params.id 
    const wetYield = req.body.weight
    const status = 'completed'
    const endDate = new Date()
    
    try {
        await newGrow.findByIdAndUpdate(growid,{
            wetYield,
            status,
            endDate
        })
        // res.status(200).json({message: 'weight updated Succefully'})
        res.redirect('/grow-log/all')
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to update weight'})
    }
}