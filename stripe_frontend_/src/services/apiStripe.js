// import stripe from 'stripe'
// const Stripe = require('stripe');
// const stripe = Stripe('sk_test_51JQBmtFs2Ed3htt4bZevG7ZyWuDlerz86uPVpzJt46GZe8XdXvyhU90zcqbQLNUJdPAWFdF6TfIbIWXH1K0VScMV00aCuXwQCi');

// import { apiStripeSecret, apiStripe } from 'services/init'
// import { getCookie } from 'utils/cookies'
// import { cryptoDecrypt } from 'utils/crypto';

// const dataCookie = getCookie('token')
// const token = dataCookie && cryptoDecrypt(dataCookie)

// export const stripeApi = stripe(apiStripe)

export const chargeStripe = async () => {
  try {
    // const respone = await stripe.charges.retrieve(
    //   'ch_3JQQe1Fs2Ed3htt40y9tQOvk',
    //   {
    //     apiKey: 'sk_test_51JQBmtFs2Ed3htt4bZevG7ZyWuDlerz86uPVpzJt46GZe8XdXvyhU90zcqbQLNUJdPAWFdF6TfIbIWXH1K0VScMV00aCuXwQCi'
    //   }
    // )
    // console.log(respone,"respone")
  } catch (error) {
    console.log(error)
  }
}