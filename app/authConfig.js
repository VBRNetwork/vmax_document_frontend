export const msalConfig = {
  auth: {
    clientId: '10edc93e-9be5-4694-a557-e0ffb929c97e',
    authority:
      'https://login.microsoftonline.com/1999d1ab-f68f-4f7a-b94e-9aa8a84542af',
    redirectUri: 'http://localhost:8080/auth/login',
  },
  //   Xru8Q~MbrZryxcWvEu60VEEs9aOeQTU6Jhd1_aSD
  //   Xru8Q~MbrZryxcWvEu60VEEs9aOeQTU6Jhd1_aSD
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
