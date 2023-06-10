const fs = require("fs")

const getAllUser = () => {
   try {
      const data = fs.readFileSync('data.json');
      return JSON.parse(data);
   } catch (error) {
      console.error('Error reading data:', error);
      return null;
   }
};

const updateUsers = (data) => {
   try {
      fs.writeFileSync("data.json", JSON.stringify(data, null, 2))
      console.log("File updated.");
   } catch (error) {
      console.log(error);
   }
}

const addUser = (user) => {
   const data = getAllUser();
   if(data) {
      data.users.push(user)
      updateUsers(data)
      console.log(data.users);
   } else {
      console.log("user addition failed.");
   }
}

const findUserByPhonenumber = (phoneno) => {
   const data = getAllUser();
   if (data) {
      const user = data.users.find((U) => U.phoneNumber === phoneno);
      return user ? user : null;
   }
   return null;
};


module.exports = {
   getAllUser,
   findUserByPhonenumber,
   addUser
}