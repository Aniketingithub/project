const router = require("express").Router();
const bcrypt = require("bcrypt");

// import utilities
const { findUserByPhonenumber, addUser } = require("../utility");

router.post("/", async (req, res) => {
	const { name, phoneNumber, password } = req.body;
	try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const userDetails = {
         name: name,
         phoneNumber: phoneNumber,
         password: hashPassword,
      };
      
      const checkUser = findUserByPhonenumber(phoneNumber);
      if (checkUser) {
         return res.send("User with phone number already exists.");
      }
      
      addUser(userDetails);
      res.send("User added succesfully.");
   } catch (error) {
      res.send(error)
   }
});

module.exports = router;
