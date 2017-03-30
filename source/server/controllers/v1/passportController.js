import passport from 'passport'

const handleAuthenticationInitialization =
  passport.authenticate( 'google', { scope:
  [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
  })

const handlePostAuthentication = ( request, response ) => {
  response.status(200).json({ message: `Hi there ${request.user.displayName}!` })
}

const handleLogOut = ( request, response ) => {
  request.logout()
  // TODO: vvv Redirect to landing view here vvv.
  response.send( 'LOGGED OUT' )
}

export {
  handleAuthenticationInitialization,
  handlePostAuthentication,
  handleLogOut
}
