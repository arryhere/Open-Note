import UserModel from '../models/UserModel.js';
import UserValidaton from '../validation/UserValidation.js'
import UserEncryption from '../cryptography/UserEncryption.js';
import UserAuthentication from '../authentication/UserAuthentication.js';

class UserController {

  signupUser = async (req, res) => {
    //user validation
    const { error, value } = UserValidaton.signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({ status: 'joi-user-signup-failed', response: error.details });
    } else {
      //check email in db
      const checkEmailExist = await UserModel.findOne({ email: value.email });
      if (checkEmailExist) {
        res.status(400).json({ status: 'db-user-check-failed', response: 'email already exists' });
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
            res.status(500).json({ status: 'db-user-insert-failed', response: error.message })
          } else {
            res.status(200).json({ status: 'db-user-insert-success', authToken: UserAuthentication.authToken(user.id) })
          }
        })
      }
    }
  }

  loginUser = async (req, res) => {
    //validation
    const { error, value } = UserValidaton.loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({ status: 'joi-user-login-failed', response: error.details });
    } else {
      //check email in db
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
        res.status(400).json({ status: 'db-user-login-failed', response: 'Please enter proper credentials' });
      } else {
        //check password
        const passwordCompare = await UserEncryption.decrypt(value.password, user.password);
        if (!passwordCompare) {
          res.status(400).json({ status: 'db-user-login-failed', response: 'Please enter proper credentials' });
        } else {
          //send token if authenticated
          res.status(200).json({ status: 'db-user-check-success', authToken: UserAuthentication.authToken(user.id) });
        }
      }
    }
  }

  profile = async (req, res) => {
    const userId = req.user.id;
    const user = await UserModel.findById({ _id: userId }).select('-password');
    res.status(200).json({
      status: 'auth-success',
      response: user
    })
  }
}



export default UserController;