import HttpErrors from 'http-errors';
import User from '../models/users.js';

export default {
  async login (req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);

      if (!user || (user.password !== User.hashPassword(password))) {
        throw new HttpErrors(401, {
          errors: {
            email: 'Invalid email or password',
          },
        });
      }

      const token = User.encrypt({
        userId: user.id,
      });

      delete user.password;

      res.json({
        token,
        user,
      });
    } catch (e) {
      next(e);
    }
  },

  async register (req, res, next) {
    try {
      const { name, age, email, password } = req.body;

      if (await User.checkEmail(email)) {
        throw new HttpErrors(422, {
          errors: {
            email: 'Email is already in use',
          },
        });
      }

      const newUser = await User.createUser({
        name,
        age,
        password: User.hashPassword(password),
        email,
      });

      delete newUser.password;

      res.json({
        message: 'User registered successfully.',
        newUser,
      });
    } catch (e) {
      next(e);
    }
  },

  async profile(req, res, next) {
    try {
      const user = await User.findById(req.userId);

      res.json({
        user,
      });
    } catch (e) {
      next(e);
    }
  }
}