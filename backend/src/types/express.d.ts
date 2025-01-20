import { User } from 'src/users/schemas/User.shema';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
