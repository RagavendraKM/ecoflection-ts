"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = {
    "client_id": "502296586742-6u0594d6evktsvidtqp2qv8cg3em2ecs.apps.googleusercontent.com",
    "project_id": "ecoflection-a078a",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "Y_PEDcTnbKzkzjEIaanqFpyt",
    "redirect_uris": "http://localhost:3001/user/auth/google/callback",
    "javascript_origins": [
        "http://localhost",
        "http://localhost:3001",
        "https://ecoflection-a078a.firebaseapp.com"
    ],
    "scopes": [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ],
    "response_type": "code",
    "access_type": "offline",
    "prompt": "consent"
};
// data = {
//     tokens: {
//       access_token: 'ya29.a0Ae4lvC0A9msNZ5xaAAyzrOwCeDmayhK5kalpb0Klyce6-2RsGQ4hfk-gd3u3DvGNQyrSWeTR9Qe1btyiMwkNuKc9UPGC_KWYI9UVwl5CP-JBVgFWzF4r2YQL9_J0A79I4rNDr5MI3D9l2d-x3h-8p9epwk7AMh6hyP0',
//       refresh_token: '1//0g-QVsQ7_Psy2CgYIARAAGBASNwF-L9IrK74o7PiZNBXrVEqhm1EggvYXOKhtLm_p6GpsgG2gK3kJBGXlwJ9R-eakxNMcM6YaeSY',
//       scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
//       token_type: 'Bearer',
//       id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4Yjc0MWU4ZGU5ODRhNDcxNTlmMTllNmQ3NzgzZTlkNGZhODEwZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MDIyOTY1ODY3NDItNnUwNTk0ZDZldmt0c3ZpZHRxcDJxdjhjZzNlbTJlY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MDIyOTY1ODY3NDItNnUwNTk0ZDZldmt0c3ZpZHRxcDJxdjhjZzNlbTJlY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDkzMzMyODA0NTg0MzkyODAxMzYiLCJlbWFpbCI6InJhZ2h1cmttN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ik1aNFptalZpMkFCY2FZaHljNDgybWciLCJuYW1lIjoicmFnaHUgcmttIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdndV9FN1U4S3NxX1FSNjlFUWl5QUdBOWdwclJCQ3BRU1l0UlRVaDBRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6InJhZ2h1IiwiZmFtaWx5X25hbWUiOiJya20iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU4Nzk3OTE2OSwiZXhwIjoxNTg3OTgyNzY5fQ.PDfKY29tUxjpepxzGxyu-mCPhKm4rJNHeQSdHz0cGwhvffOU6SK853_JCyJKXwBVyB9rrH0aYhYCYOoPKW_RCUikT5OSbUhHdtHfbhnqrQZ87UpVRQ7rEN6va1gRMnJtW8UBp3brsqn8_PUnpV9ena3cGcsC_G54P2ZpGTSfqBOQ13H2fFOZxrSVoOtQYAlSyAMTaPzBt0h-vvZwXs7jfQk6OONQcNeFpQXL8Y-nsI36o4PV3mBeQcQPWdy65mr4OJh9Zlg-PoA_ni7ZObyRfN8YohsWohrO-tOdNmvx_6OhnYcZdKKlXwSh_x2V9Y_WlXDCmv4_c5yIaIhQg47_ww',
//       expiry_date: 1587982768329
//     },
//     res: {
//       config: {
//         method: 'POST',
//         url: 'https://oauth2.googleapis.com/token',
//         data: 'code=4%2FzAED1F3LXNxAyrooGyG1baCj5f7rZIweRrhWirIDlxb7yCCnSUUGsUCFanm-lYPJL8WHePYeLu7HkMOjh7fqceU&client_id=502296586742-6u0594d6evktsvidtqp2qv8cg3em2ecs.apps.googleusercontent.com&client_secret=Y_PEDcTnbKzkzjEIaanqFpyt&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fuser%2Fauth%2Fgoogle%2Fcallback&grant_type=authorization_code&code_verifier=',
//         headers: [Object],
//         params: [Object: null prototype] {},
//         paramsSerializer: [Function: paramsSerializer],
//         body: 'code=4%2FzAED1F3LXNxAyrooGyG1baCj5f7rZIweRrhWirIDlxb7yCCnSUUGsUCFanm-lYPJL8WHePYeLu7HkMOjh7fqceU&client_id=502296586742-6u0594d6evktsvidtqp2qv8cg3em2ecs.apps.googleusercontent.com&client_secret=Y_PEDcTnbKzkzjEIaanqFpyt&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fuser%2Fauth%2Fgoogle%2Fcallback&grant_type=authorization_code&code_verifier=',
//         validateStatus: [Function: validateStatus],
//         responseType: 'json'
//       },
//       data: {
//         access_token: 'ya29.a0Ae4lvC0A9msNZ5xaAAyzrOwCeDmayhK5kalpb0Klyce6-2RsGQ4hfk-gd3u3DvGNQyrSWeTR9Qe1btyiMwkNuKc9UPGC_KWYI9UVwl5CP-JBVgFWzF4r2YQL9_J0A79I4rNDr5MI3D9l2d-x3h-8p9epwk7AMh6hyP0',
//         refresh_token: '1//0g-QVsQ7_Psy2CgYIARAAGBASNwF-L9IrK74o7PiZNBXrVEqhm1EggvYXOKhtLm_p6GpsgG2gK3kJBGXlwJ9R-eakxNMcM6YaeSY',
//         scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
//         token_type: 'Bearer',
//         id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4Yjc0MWU4ZGU5ODRhNDcxNTlmMTllNmQ3NzgzZTlkNGZhODEwZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MDIyOTY1ODY3NDItNnUwNTk0ZDZldmt0c3ZpZHRxcDJxdjhjZzNlbTJlY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MDIyOTY1ODY3NDItNnUwNTk0ZDZldmt0c3ZpZHRxcDJxdjhjZzNlbTJlY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDkzMzMyODA0NTg0MzkyODAxMzYiLCJlbWFpbCI6InJhZ2h1cmttN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ik1aNFptalZpMkFCY2FZaHljNDgybWciLCJuYW1lIjoicmFnaHUgcmttIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdndV9FN1U4S3NxX1FSNjlFUWl5QUdBOWdwclJCQ3BRU1l0UlRVaDBRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6InJhZ2h1IiwiZmFtaWx5X25hbWUiOiJya20iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU4Nzk3OTE2OSwiZXhwIjoxNTg3OTgyNzY5fQ.PDfKY29tUxjpepxzGxyu-mCPhKm4rJNHeQSdHz0cGwhvffOU6SK853_JCyJKXwBVyB9rrH0aYhYCYOoPKW_RCUikT5OSbUhHdtHfbhnqrQZ87UpVRQ7rEN6va1gRMnJtW8UBp3brsqn8_PUnpV9ena3cGcsC_G54P2ZpGTSfqBOQ13H2fFOZxrSVoOtQYAlSyAMTaPzBt0h-vvZwXs7jfQk6OONQcNeFpQXL8Y-nsI36o4PV3mBeQcQPWdy65mr4OJh9Zlg-PoA_ni7ZObyRfN8YohsWohrO-tOdNmvx_6OhnYcZdKKlXwSh_x2V9Y_WlXDCmv4_c5yIaIhQg47_ww',
//         expiry_date: 1587982768329
//       },
//       headers: {
//         'alt-svc': 'quic=":443"; ma=2592000; v="46,43",h3-Q050=":443"; ma=2592000,h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,h3-T050=":443"; ma=2592000',
//         'cache-control': 'private',
//         connection: 'close',
//         'content-encoding': 'gzip',
//         'content-type': 'application/json; charset=utf-8',
//         date: 'Mon, 27 Apr 2020 09:19:29 GMT',
//         server: 'scaffolding on HTTPServer2',
//         'transfer-encoding': 'chunked',
//         vary: 'Origin, X-Origin, Referer',
//         'x-content-type-options': 'nosniff',
//         'x-frame-options': 'SAMEORIGIN',
//         'x-xss-protection': '0'
//       },
//       status: 200,
//       statusText: 'OK',
//       request: { responseURL: 'https://oauth2.googleapis.com/token' }
//     }
//   }
//# sourceMappingURL=oauth2.keys.js.map