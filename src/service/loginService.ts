import axios from '../myAxios'
import { Config } from './baseConfig'

class LoginService{
    async easyRbacLogout():Promise<void>{
        let path = Config.BaseUrl + "/easyRBAC/login/logout"
        console.log(path)
        await axios.get(path)
    }
}

export const loginService  = new LoginService()