// src/auth/utils/cognito-auth.ts
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-southeast-1_vmauDO9gC', // Your user pool id here
  ClientId: '1tbucn92rl5d6u74q9ospmhm2h', // Your client id here
};

const userPool = new CognitoUserPool(poolData);

export async function signIn(username: string, password: string): Promise<any> {
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        // Store tokens in localStorage or sessionStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('refreshToken', refreshToken);

        resolve(result);
      },
      onFailure: (err) => {
        console.error(err);
        reject(err);
      },
    });
  });
}
