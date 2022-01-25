const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//Registration of o new user
async function addUser(req, res, next) {
  try {
     const { name, email, password } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = {...req.body, password: hashedPassword}

     const toBeAddedUser = await prisma.users.create({
       data: newUser
   });

   console.log(toBeAddedUser);
 
   res.json({ message: "User created successfully"});
   
  } catch (error) {
    next(error);
  }
}

//User login
async function userLogin(req, res, next) {
  try {
    const {name, email, password, status } = req.body;
    //find a user who has this email
    const user = await prisma.users.findUnique({
     where: { 
        email: email,
     }
    });

    if (user.email && user.status === 'active') {
      const isValidPassword = await bcrypt.compare(
        password,
        user.password
      );
      if (isValidPassword) {
        //prepare the user object to generate token
        const userObject = {
          name: user.name,
          email: user.email,
        };

        const token = jwt.sign(
          {
            name: user.name,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '2 days',
          }
        );

        res.status(200).json({
          role: 'user',
          user: userObject,
          access_token: token,
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
    console.log(Users);
  } catch (error) {
     next(error);
  }
}


//Update User
async function updateUser(req, res, next){
  try {
      const updatedUser = await prisma.users.update({
          where: {
              email: req.params.email,
          },
          data: req.body
      });
      res.json(updatedUser);
      
  } catch (error) {
      next(error);        
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
              email: req.params.email,
          },
          data: {
            status: status
          }
      });
      res.json(updatedUser);
      
  } catch (error) {
      next(error);        
  }

}

//delete User
async function deleteUser(req, res, next){
    try {
        const deletedUser = await prisma.users.delete({
            where: {
                email: req.params.email,
            },
        });
        res.json(deletedUser);
        
    } catch (error) {
        next(error);        
    }
  
}



module.exports = {
    addUser,
    userLogin,
    getAllUsers,
    updateUser,
    deleteUser,
    updateUserStatus,
    
}