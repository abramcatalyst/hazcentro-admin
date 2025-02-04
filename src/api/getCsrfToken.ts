import axios from "axios";

axios.defaults.withCredentials = true;

async function getCsrfCookie() {
  try {
    await axios.get(`https://haz.reevaluateme.online/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
    // CSRF cookie is now set; you can make subsequent requests.
  } catch (error) {
    console.error("Error fetching CSRF cookie", error);
  }
}

export default getCsrfCookie;
