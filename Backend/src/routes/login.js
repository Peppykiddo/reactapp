const { Router } = require("express");
const router = Router();


router.post('/api/login', (req, res) => {
    // Skip email and password validation for testing
    res.json({ message: 'Login successful' });
});


module.exports = router;
