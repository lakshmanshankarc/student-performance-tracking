
import axios from "axios";
export async function redirectIfNoToken() {
    let res = await axios.get("/api/user/islogged")
    if (res.data.redirect) {
        window.location.href = "/users/login"
    } else {
        console.log(res.data)
    }
}