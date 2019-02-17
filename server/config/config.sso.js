let BASE_URL = ''
if (process.env.NODE_ENV === 'production') {
  BASE_URL = process.env.PROD_URL_API
} else {
  BASE_URL = process.env.DEV_URL_API
}
module.exports = {
  'facebookAuth': {
    'clientID': '2086263614924092',
    'clientSecret': '649772e5fc563095e6fb15f983eb26c0',
    'callbackURL': `${BASE_URL}/auth/facebook/callback`
  },
  'twitterAuth': {
    'consumerKey': 'your-consumer-key-here',
    'consumerSecret': 'your-client-secrWet-here',
    'callbackURL': `${BASE_URL}/auth/twitter/callback`
  },
  'googleAuth': {
    'clientID': '293605474659-lgk98guv20tqs79mvhd1u91mbs3q6lhh.apps.googleusercontent.com',
    'clientSecret': 'WFqKJRyzeH965k6oMX4UaR-R',
    'callbackURL': `${BASE_URL}/auth/google/callback`
  }
}
