import passport from 'passport'

const getOAuthPermissionCode =
  passport.authenticate( 'google', { scope:
  [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ],
    accessType: 'offline',
    prompt: 'consent'
  })

const handleSuccessfulAuthentication = ( request, response ) => {
  response.redirect( request.session.redirectTo || '/' )
}

const handleLogOut = ( request, response ) => {
  request.logout()
  response.redirect( '/' )
}

export {
  getOAuthPermissionCode,
  handleSuccessfulAuthentication,
  handleLogOut
}
