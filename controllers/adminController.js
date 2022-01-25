const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



async function adminLogin(req, res, next) {
    try {
        const { email, password } = req.body;
  
        const Admin = await prisma.admin.findUnique({
            where: {
              email: email
            },
           })
          
        let isValid = false;
        if(Admin.password === password) {
          isValid = true;
        }

        if(isValid){
          res.status(200).json({
            role: 'admin',
            adminEmail: email,            
            message: "Admin Logged In successfully!",
          });
        }
        else {
          throw createError("Login failed! Please try again.");
        }
      } catch (err) {
        next(err)
      }
  }


module.exports = {
    adminLogin
}