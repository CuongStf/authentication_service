module.exports = {
  'facebookAuth': {
    'clientID': '2086263614924092',
    'clientSecret': '649772e5fc563095e6fb15f983eb26c0',
    'callbackURL': `${process.env.BASE_URL_API}/auth/facebook/callback`
  },
  'twitterAuth': {
    'consumerKey': 'your-consumer-key-here',
    'consumerSecret': 'your-client-secrWet-here',
    'callbackURL': `${process.env.BASE_URL_API}/auth/twitter/callback`
  },
  'googleAuth': {
    'clientID': '293605474659-lgk98guv20tqs79mvhd1u91mbs3q6lhh.apps.googleusercontent.com',
    'clientSecret': 'WFqKJRyzeH965k6oMX4UaR-R',
    'callbackURL': `${process.env.BASE_URL_API}/auth/google/callback`
  }
}
