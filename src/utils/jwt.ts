import { VerifiedCallback } from './../../node_modules/@types/passport-jwt/index.d';
import passport, { PassportStatic } from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { User } from '../models/User';
export const passportConfig = function (passport: PassportStatic) {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
      (req) => {
        return req?.cookies?.jwt ?? null;
      },
    ]),
    secretOrKey: process.env.JWT_KEY,
  };

  const verify: VerifiedCallback = async (jwt_payload, done: any) => {
    try {
      const user = await User.find({ username: jwt_payload.sub });
      if (user) return done(null, user);
      else return done(null, false);
    } catch (e) {
      return done(e, false);
    }
  };
  const jwtStrategy = new JwtStrategy(options, verify);
  passport.use(jwtStrategy);
};
