import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        let config = {
          url: environment.keycloak.issuer,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
          //clientSecret: environment.keycloak.credentials.secret
        };
        await keycloak.init({
          config: {
            url: environment.keycloak.issuer,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: true,
          },

          bearerExcludedUrls: ['/assets'],
        });
        resolve(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };
}
