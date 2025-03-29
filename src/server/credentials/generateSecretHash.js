const crypto = require('crypto');

const generateSecretHash = (clientId, clientSecret, username) => {
  const hmac = crypto.createHmac('sha256', clientSecret);
  hmac.update(username + clientId);
  return hmac.digest('base64');
};

export default generateSecretHash;