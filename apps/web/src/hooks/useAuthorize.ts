import { useEffect, useState } from "react"
import Cookies from "js-cookie"


export const useAuthorize = ()=> {
    const token = Cookies.get('token')
      const [isAuthorized, setIsAuthorized] = useState(false)
    
      useEffect(()=>{
        if (token) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      },[token])

      return isAuthorized
}