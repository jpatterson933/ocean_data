import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  signUp(idToken) {
    // sends newly signed up user to verify_email page
    localStorage.setItem("id_token", idToken);

    window.location.assign("/verify_email");
  }

  isVerified() {
    const token = localStorage.getItem("id_token");

    if(token){
      try {
        const decoded = decode(token);
        console.log(decoded)
        if(decoded.data.isVerified){
          return true;
        }
      } catch (error){
        console.error(error);
        return false;
      }
    }

    return false;
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
