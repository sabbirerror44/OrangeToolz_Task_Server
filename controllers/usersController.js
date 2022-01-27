const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require("http-errors");


//Registration of o new user
async function addUser(req, res, next) {
  try {
     const { name, email, password } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = {...req.body, password: hashedPassword}

     const toBeAddedUser = await prisma.users.create({
       data: newUser
   });
   res.json({ message: "User created successfully"});
   
  } catch (error) {
    next(error);
  }
}

//User login
async function userLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await prisma.users.findFirst({
     where: { 
        email: username,
     }
    });

    if (user.email && user.status === 'active') {
      const isValidPassword = await bcrypt.compare(
        password,
        user.password
      );
      if (isValidPassword) {
        const userObject = {
          name: user.name,
          email: user.email,
        };
        res.status(200).json({
          role: 'user',
          user: userObject,
          message: "User Logged In successfully!",
        });
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (err) {
    next(err);
  }
}


async function getAllUsers(req, res, next) {
  try {
    const Users = await prisma.users.findMany({});
    res.status(200).json(Users);
  } catch (error) {
     next(error);
  }
}


//Update User
async function updateUser(req, res, next){
  try {
        await prisma.users.update({
          where: {
              id: Number(req.params.id),
          },
          data: req.body
      });
      res.status(200).json({
        message: "User updated successfully!",
      });
      
  } catch (error) {
    res.status(500).json({
      message: "Couldn't update the user!"
    });         
  }

}

//Update User's Status
async function updateUserStatus(req, res, next){
  try {
      let status;

      if(req.params.status === 'active') {
        status = 'block';
      }
      else{
        status = 'active';
      }
      const updatedUser = await prisma.users.update({
          where: {
              id: Number(req.params.id),
          },
          data: {
            status: status
          }
      });
      res.status(200).json({
        message: "Status updated successfully!",
      });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't update the status!"
    });       
  }

}

//delete User
async function deleteUser(req, res, next){
    try {
      console.log(req.params.id);
      await prisma.users.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json({
          message: "User deleted successfully!",
        });
        
    } catch (err) {
      res.status(500).json({
        message: "Couldn't delete the user!"
      });
    }     
  
}

// upload file and file info
async function uploadFile(req, res, next) {
  let newfile;
  if (req.files && req.files.length > 0) {

  const newfile = {...req.body, file: req.files[0].filename }
  console.log(newfile);
  //save file or send error
    try {
      const toBeAddedfile = await prisma.files.create({
        data: newfile
      });

      res.status(200).json({
        message: "File added successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  }
}


module.exports = {
    addUser,
    userLogin,
    getAllUsers,
    updateUser,
    deleteUser,
    updateUserStatus,
    uploadFile,   
}