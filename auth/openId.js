// curl -X POST https://account-idetest.agetic.gob.bo/reg -H "Content-Type: application/json" -d '{"redirect_uris": ["http://localhost:8080/public/oauth/login.html"], "post_logout_redirect_uris":["http://localhost:8080/public/oauth/logout.html"],"client_name":"frontend_base_vue","token_endpoint_auth_method":"client_secret_basic","authorization_params":{"scope":"openid nombre email documento_identidad fecha_nacimiento celular"},"grant_types":["authorization_code"],"response_types":["code"],"application_type":"web","contacts":["dbarra@agetic.gob.bo"]}'
const openId = {
  // issuer server openid connect
  issuer: 'https://account-idetest.agetic.gob.bo',
  // response registry client
  client: {
    application_type: 'web',
    grant_types: [
      'authorization_code'
    ],
    id_token_signed_response_alg: 'RS256',
    require_auth_time: false,
    response_types: [
      'code'
    ],
    subject_type: 'public',
    token_endpoint_auth_method: 'client_secret_basic',
    introspection_signed_response_alg: 'RS256',
    post_logout_redirect_uris: [
      'http://localhost:8080/public/oauth/logout.html'
    ],
    backchannel_logout_session_required: false,
    frontchannel_logout_session_required: false,
    authorization_signed_response_alg: 'RS256',
    web_message_uris: [],
    client_id_issued_at: 1577741908,
    client_id: 'dd1d0c3e-77b5-45ae-b04f-0490ac4fee66',
    client_name: 'frontend_base_vue',
    client_secret_expires_at: 0,
    client_secret: 'BAsvairhq3+sQlzC7SxEX7w+RpP0bGBwJXKpBzD0w5ol6GhExi3KVWKrXgiT7Mom',
    contacts: [
      'dbarra@agetic.gob.bo'
    ],
    redirect_uris: [
      'http://localhost:8080/public/oauth/login.html'
    ],
    introspection_endpoint_auth_method: 'client_secret_basic',
    revocation_endpoint_auth_method: 'client_secret_basic',
    registration_client_uri: 'https://account-idetest.agetic.gob.bo/reg/dd1d0c3e-77b5-45ae-b04f-0490ac4fee66',
    registration_access_token: 'KRkPZXZzRJmgGWowAfR4CenUlboUbIc4Z6V_qUp4Wg5'
  },
  // parameters registry client
  client_params: {
    scope: ['openid nombre email documento_identidad fecha_nacimiento celular']
    // prompt: 'consent',
  }
};

module.exports = openId;
