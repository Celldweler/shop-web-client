import {UserManager, WebStorageStateStore, Log, Logger} from "oidc-client"

export default async function ({app, store}, inject) {
  const mgr = new UserManager({
    userStore: new WebStorageStateStore({store: window.localStorage}),
    authority: "https://localhost:5001",
    client_id: "web-client",
    redirect_uri: "https://localhost:3000/oidc/signin-callback.html",
    response_type: "code",
    scope: "openid profile email IdentityServerApi role address phone_number",
    post_logout_redirect_uri: 'https://localhost:3000',
    silent_redirect_uri: 'https://localhost:3000/oidc/signin-silent-callback.html', //signin-silent-callback
    loadUserInfo: true,

    // automaticSilentRenew: true,
    // accessTokenExpiringNotificationTime: 10,
  });
  // events
  mgr.events.addAccessTokenExpiring(function () {
    console.log("token expiring");
  });

  mgr.events.addAccessTokenExpired(function () {
    console.log("token expired");
  });

  mgr.events.addSilentRenewError(function (e) {
    console.log("silent renew error", e.message);
  });

  mgr.events.addUserLoaded(function (user) {
    console.log("user loaded", user);
    mgr.getUser().then(function () {
      console.log("getUser loaded user after userLoaded event fired");
    }, () => {
    });
  });

  mgr.events.addUserUnloaded(function (e) {
    console.log("user unloaded");
  });
  // userManager.events.addUserSessionChanged()
  inject('authPlugin', mgr);
  await store.dispatch('clientInit');
}
