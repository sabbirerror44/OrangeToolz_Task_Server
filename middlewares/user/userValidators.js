//external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


//add user validator
const addUserValidators = [
    check("name")
      .isLength({ min: 1 })
      .withMessage("Name is required")
      .isAlpha("en-US", { ignore: " -" })
      .withMessage("Name must not contain anything other than alphabet")
      .trim(),
  
    check("email")
      .isEmail()
      .withMessage("Invalid email address")
      .trim()
      .custom(async (value) => {
        try {
          const user = await prisma.users.findUnique({
            where: {
                email: value
            }       
        });
          if (user) {
            throw createError("Email already in use!");
          }
        } catch (err) {
          throw createError(err.message);
        }
      }),
  
    
    check("password")
        .isLength({ min: 4 })
        .withMessage(
        "Password must be at least 5 characters"
      ),
  ];
  
  const addUserValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
      next();
    } else {
     
     // response the errors
      res.status(500).json({
        errors: mappedErrors,
      });
    }
  };
  
  module.exports = {
    addUserValidators,
    addUserValidationHandler,
  };
  