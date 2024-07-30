import { Login } from "./login"
import './auth.css'

export const AuthComponent = () => {
    return (
        <div className="flex items-center gap-[30px] min-h-screen ">
            <div className="w-[50%] flex justify-end items-center min-h-screen ">
                <img src='/home-phones-2x.png' alt="" height='auto' width='60%' className="mt-8 relative"/>
                
                <div className="absolute mb-2 left-[29%] ml-[16px] w-[16%] z-30">
                <img src='/photo-1.png' alt=""/>
                </div>
                
            </div>
            {/* handle here login or sign component */}
            <div className="flex items-center min-h-screen">
                <Login />
            </div>
        </div>
    )

}