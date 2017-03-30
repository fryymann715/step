import GoogleStrategy from 'passport-google-oauth2'
import { getUserByOAuthID } from '../dataServices/database/queries/utilities'
import { createRecord } from '../dataServices/database/commands/utilities'
import '../../configuration/environment'

const passportCredentials = {
  GOOGLE_CONSUMER_KEY: '561778736592-pkk0fomt2mi29dkd5a9m0fcdtumu7fcu.apps.googleusercontent.com',
  CLIENT_SECRET: 'ZK6QUW-OjNxvXwDIPVEK0ZQ6'
}

const googlePassportStrategy = new GoogleStrategy({
  clientID: passportCredentials.GOOGLE_CONSUMER_KEY,
  clientSecret: passportCredentials.CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:1337/google/auth/callback',
  passReqToCallback: true
},
  ( request, accessToken, refreshToken, profile, done ) => {
    getUserByOAuthID( profile.id )
    .then( user => {
      if ( user.length === 0 ) {
        const attributes = {
          oauthID: profile.id,
          email: profile.email,
          displayName: profile.name.givenName,
          created_at: new Date()
        }
        createRecord( 'users', attributes )
        .then( newUser => done( null, newUser ) )
      } else {
        done( null, user[0] )
      }
    })
  })

export default googlePassportStrategy
