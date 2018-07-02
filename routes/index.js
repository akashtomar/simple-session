const router = require('express').Router(); 
const path = require('path');
const sessionCheck = require('../src/sessionCheck');

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

router.post('/', (req,res)=>{
    req.session.user = req.body.username;
    res.redirect('/home');

});
router.get('/home', sessionCheck, (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/home.html'));
});

router.get('/logout', sessionCheck, (req,res)=>{
    return req.session.destroy(()=>{
        res.send('session destryed!')
    });

});

router.get('/random', sessionCheck ,(req,res)=>{
    res.send(req.session.user);
})

module.exports = router;