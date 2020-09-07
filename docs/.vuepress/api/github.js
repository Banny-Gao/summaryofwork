import {
  queryParse,
  queryStringify,
  axiosGithub,
} from './base'

const clientID = 'c5294d68cc4ea37acb2c'   //dev
// const clientID = '9494cde758cacea4c23b'
// const clientSecret = '71bd64bc450fdd30f1adcf6904abf4c8f797ebd0'
const clientSecret = 'e2cbfe0114b23f8d989c5132d0f1b85d5342461e'  // dev
const proxy = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token'

export const getAccessToken = async () => {
  const query = queryParse()
  const authQuery = queryStringify({
    client_id: clientID,
    redirect_uri: location.href,
    scope: 'public_repo'
  })

  if (query.code) {
    const { data } = await axiosGithub.post(proxy, {
      code: query.code,
      client_id: clientID,
      client_secret: clientSecret
    })

    const { access_token } = data
    accessToken.value = access_token
  }
  else location.href = `https://github.com/login/oauth/authorize?${authQuery}`
}


export const getMyStars = async (params = {
  per_page: 4,
  page: 1,
  q: '',
  sort: 'created',  // stars updated
  language: 'javascript'
}) => axiosGithub.get(`/users/Mackkkk/starred?${queryStringify(params)}`)


export const fetchMyStars = async (params) => axiosGithub.get('/user/starred', {
  params,
  headers: {
    Authorization: `token ${accessToken.value}`
  }
})

const accessToken = {
  get value() {
    return localStorage.getItem('access_token')
  },
  set value(val) {
    localStorage.setItem('access_token', val)
  }
}


