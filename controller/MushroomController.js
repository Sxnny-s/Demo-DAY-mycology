const newGrow = require('../models/newGrow')
const NewGrow = require('../models/newGrow')


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
        const grows = await NewGrow.find({ user: req.user._id })
        res.render('grow-log/all',{
            grows,
            stages
        }

        )
    } catch (error) {
        console.error('Error fetching grows:', error);

    }
}




// ----------------- Create Operations -----------------

// Create new grow object
exports.startGrow = async (req,res) => {
    const {tek,species,strain,generation,contamination,substrateType,grainType,substrateDepth} = req.body
    const freshGrow = new NewGrow({
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

    try {
        await freshGrow.save();
        res.redirect('/grow-log')
    } catch (err) {
        console.error(err)
        res.redirect('/grow-log/new')
    }
}


// ----------------- Update Operations -----------------
exports.updateStage = async (req, res) => {
   const { id: growid } = req.params;

   try {
    const grow = await NewGrow.findById(growid) 

    const currentStage = grow.stages.findIndex(stage => stage.isCurrent === true)
    console.log(currentStage) 
    // setting current stage to false
    grow.stages[currentStage].isCurrent = false
    // Settting the next stage to true
    grow.stages[currentStage + 1].isCurrent = true

    await grow.save();
    return res.status(200).json({ message: 'Stage updated successfully', grow:grow });

   } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Server Error'})
   }
    
}


exports.updateGrowWeight = async (req, res) => {
    const growid = req.params.id 

    try {
        await newGrow.findByIdAndUpdate(growid,{
            
        })

    } catch (err) {
        
    }
}