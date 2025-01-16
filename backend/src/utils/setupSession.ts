import { Response } from 'express';
import { Session } from 'src/users/schemas/Session.schema';

export const setupSession = (res: Response, session: Session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};
