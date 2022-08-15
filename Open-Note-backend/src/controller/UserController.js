import UserModel from '../models/UserModel.js';
import UserValidaton from '../validation/UserValidation.js'
import UserEncryption from '../cryptography/UserEncryption.js';
import UserAuthentication from '../authentication/UserAuthentication.js';

class UserController {

  signupUser = async (req, res) => {
    //user validation
    const { error, value } = UserValidaton.signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Signup validation failed',
        data: error.details.map((e) => { return e.message.replace(/"/gi, '') })
      });
    } else {
      //check email in db
      const checkEmailExist = await UserModel.findOne({ email: value.email });
      if (checkEmailExist) {
        res.status(400).json({
          success: false,
          message: 'Email already exists, please try another email',
          data: JSON.stringify(value)
        });
      } else {
        //encryption
        const data = {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: await UserEncryption.encrypt(value.password)
        }
        //insert
        const user = new UserModel(data);
        user.save((error, user) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: 'Signup failed, please try again',
              data: error.message
            })
          } else {
            res.status(200).json({
              success: true,
              message: 'Signup successful',
              data: UserAuthentication.authToken(user.id)
            })
          }
        })
      }
    }
  }

  loginUser = async (req, res) => {
    //validation
    const { error, value } = UserValidaton.loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Login validation failed',
        data: error.details.map((e) => { return e.message.replace(/"/gi, '') })
      });
    } else {
      //check email in db
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
        res.status(400).json({
          success: false,
          message: 'Login faiiled, please enter proper credentials',
          data: null
        });
      } else {
        //check password
        const passwordCompare = await UserEncryption.decrypt(value.password, user.password);
        if (!passwordCompare) {
          res.status(400).json({
            success: false,
            message: 'Login faiiled, please enter proper credentials',
            data: null
          });
        } else {
          //send token if authenticated
          res.status(200).json({
            success: true,
            message: 'Login successful',
            data: UserAuthentication.authToken(user.id)
          });
        }
      }
    }
  }

  getProfile = async (req, res) => {
    const userId = req.user.id;
    const user = await UserModel.findById({ _id: userId }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      data: user
    })
  }
}

export default UserController;