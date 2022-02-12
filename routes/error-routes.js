const router = require('express').Router();

router.get('/:code', (req, res)=>{
    res.send(req.params.code);
});


module.exports = router;