const bcrypt = require("bcryptjs");

const plainTextPassword = "pass";
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error generating hash:", err);
    process.exit(1);
  }
  console.log("Hashed password:", hash);
});
