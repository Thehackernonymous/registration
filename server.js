const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8082;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost/registration');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  mobileno: Number,
  password: String,
  confirmpassword: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.render('registration');
});

app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, mobileno, password, confirmpassword } = req.body;
    const newUser = new User({ firstname, lastname, email, mobileno, password, confirmpassword });
    await newUser.save();
    res.render('registrationpage', { user: newUser });
  } catch (error) {
    res.status(500).send('Error during registration');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
