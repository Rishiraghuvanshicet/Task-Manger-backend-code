const db = require("../store/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../util/token");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please Fill All Details" });
  }

  const findUser = await db.users.find((user) => user.email === email);

  if (findUser) {
    return res.status(400).json({ message: "user already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassowrd = await bcrypt.hash(password, salt);

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassowrd,
  };

  db.users.push(user);
  db.tasks[user.id] = [];
  res.status(201).json({ message: "User Registered Succcessfully" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please Fill All Details" });
  }

  const findUser = await db.users.find((user) => user.email === email);

  if (!findUser) {
    return res.status(400).json({ message: "user not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, findUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken();
  db.sessions[token] = findUser.id;

  res.status(200).json({
    message: "Login Successfull",
    token: generateToken(findUser.id),
  });
};

module.exports = {
  registerUser,
  loginUser,
};
