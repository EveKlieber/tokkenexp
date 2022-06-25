const encoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImV2aSBzYWdlcnQzIiwidXNlcklkIjoiNjI5ZjhlNDY2M2FmYmYwNjNhM2FlZDc0IiwiaWF0IjoxNjU0NjI1Nzc2LCJleHAiOjE2NTQ2MjYzNzZ9.aMvCwzkeLQK3Q6pm6sNLGz78VCaXj4kEeRjJDp3MNSI'
const header = {
  "alg": "HS256",
  "typ": "JWT"
}
const payload = {
  "userName": "evi sagert3",
  "userId": "629f8e4663afbf063a3aed74",
  "iat": 1654625776,
  "exp": 1654626376
}

// Remember that exp, nbf and iat are NumericDate, see related Token Expiration (exp claim)

// const verifySignature = HMACSHA256(
//   base64UrlEncode(header) + "." +
//   base64UrlEncode(payload), your-256-bit-secret

// )
const isTokenExpired = (encoded) => (Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000)

// $ npm install jsonwebtoken
/// https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#jwtverifytoken-secretorpublickey-options-callback

const timestamp = 1654626376;
const date = new Date(timestamp * 1000);
const datevalues = [
   date.getFullYear(),
   date.getMonth()+1,
   date.getDate(),
   date.getHours(),
   date.getMinutes(),
   date.getSeconds(),
];
console.log('datevalues', datevalues);

const dateHelper = dateHelperFactory();
const formatMe = date => {
  const vals = [...`yyyy,mm,dd,hh,mmi,ss,mms`.split(`,`)];
  const myDate = dateHelper(date).toArr(...vals);
  return `${myDate.slice(0, 3).join(`/`)} ${
    myDate.slice(3, 6).join(`:`)}.${
    myDate.slice(-1)[0]}`;
};

// to a formatted date with zero padded values
console.log('formatMe', formatMe(new Date(1654626376 * 1000)));

// the raw values
console.log('raw values', dateHelper(new Date(1301090400 * 1000)).values);

function dateHelperFactory() {
  const padZero = (val, len = 2) => `${val}`.padStart(len, `0`);
  const setValues = date => {
    let vals = {
       yyyy: date.getFullYear(),
       m: date.getMonth()+1,
       d: date.getDate(),
       h: date.getHours(),
       mi: date.getMinutes(),
       s: date.getSeconds(),
       ms: date.getMilliseconds(), };
    Object.keys(vals).filter(k => k !== `yyyy`).forEach(k => 
      vals[k[0]+k] = padZero(vals[k], k === `ms` && 3 || 2) );
    return vals;
  };
  
  return date => ( {
    values: setValues(date),
    toArr(...items) { return items.map(i => this.values[i]); },
  } );
}




