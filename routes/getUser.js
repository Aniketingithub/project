const router = require("express").Router();
const bcrypt = require("bcrypt");

// import utilities
const { findUserByPhonenumber } = require("../utility");

router.get("/", async (req, res) => {
	const { phoneNumber, password } = req.body;
	// check if user has registered or not
	const user = findUserByPhonenumber(phoneNumber);
	if (!user) {
		return res.status(404).send("User with phone number not registered.");
	}
	
	try {
		// check if password entered is valid or not
		const validPasswordCheck = await bcrypt.compare(password, user.password);
		if (!validPasswordCheck) {
			return res.status(404).send("Invalid Password. Re-enter your password.");
		}
		res.status(200).send(user);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
