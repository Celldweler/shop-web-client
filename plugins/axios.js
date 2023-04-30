export default function ({$axios, store, $authPlugin}) {
  $axios.onError(error => {
    if (error.response.status === 401) {
      console.log("my custom axios plugin: ", error);
      console.log('renewing tokens');

      $authPlugin.signinSilent()
        .then(function (user) {
          $axios.setToken(`Bearer ${user.access_token}`)
          console.log("Token refreshed", user);
        }).catch(function (error) {
        console.log("Something went wrong", error);
      });

    }
  })
}
