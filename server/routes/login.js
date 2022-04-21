
const router = require('express').Router();
const loginController = require('../controllers/loginController');
const jwt = require('jsonwebtoken');


const authorize = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({message: 'No token found. Please login'});
    }
    const authTokenArray = req.headers.authorization.split(' ');
    if (authTokenArray[0].toLowerCase() !== 'bearer' && authTokenArray.length !== 2) {
        return res.status(401).json({message: 'Invalid token. Please login'});
    }

    jwt.verify(authTokenArray[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'This token is expired or invalid'});
        } else {
            req.jwtPayload = decoded;
            next();
        }
    });
}


router.post('/', loginController.login);

router.get('/profile', authorize, (req, res) => {
    res.json({
        tokenInfo: req.jwtPayload,
        sensititveInformation: {
            secret: 'Old school RPGs, terrible terrible puns, Lo-fi beats to relax/study to'
        }
    });
})

// router.get('/super-secret', authorize, (req, res) => {
//     res.json({
//         superSecretMessage: 'This is a secret to everybody'
//     });
// });

module.exports = router;

