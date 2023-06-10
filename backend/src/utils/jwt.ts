import { PassportStatic } from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { User } from '../models';
export const passportConfig = (passport: PassportStatic) => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
  };

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne(
        { username: jwt_payload.sub },
        function (err: any, user: any) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        }
      );
    })
  );
};
