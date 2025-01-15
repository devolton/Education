import {useAuth} from "../../../../contexts/AuthContext";
import {useState} from "react";
import SingInPage from "../../page/SingInPage";
import {Link} from "react-router-dom";

export default function LoginContainer() {
    const [userLogin,setLogin] =useState('');
    const [password, setPassword] = useState('');
    const {isAuth, login} = useAuth();

    return (<div className="px-5 py-5 p-lg-0 mt-3">
            <div className="d-flex justify-content-center">
                <div
                    className="col-12 col-md-9 col-lg-7 min-h-lg-screen d-flex flex-column justify-content-center py-lg-16 px-lg-20 position-relative">
                    <div className="row">
                        <div className="col-lg-10 col-md-9 col-xl-7 mx-auto">
                            <div className="text-center mb-12">
                                <span className="d-inline-block d-lg-block h1 mb-lg-6 me-3">👋</span>
                                <h1 className="ls-tight font-bolder h2">
                                    Welcome!
                                </h1>
                                <p className="mt-2">Please, login in your account</p>
                            </div>
                            <form>
                                <div className="mb-5">
                                    <label className="form-label" htmlFor="email">Login</label>
                                    <input type="text" className="form-control" id="login"
                                           placeholder="Your login"
                                           value={userLogin}
                                           onChange={(e)=>{setLogin(e.target.value)}}

                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password"
                                           autoComplete="current-password"
                                           value={password}
                                           onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </div>
                            </form>
                            <div className='d-flex flex-column  justify-content-around align-items-center'>
                                <button type={'button'} onClick={()=>{login(userLogin,password)}} className='btn btn-primary w-25'>Login</button>
                                <div className="my-6 mb-4 mt-4">
                                    <small>Don't have an account?</small>
                                    <Link to={'/auth/sign-in'} className="text-warning text-sm font-semibold">Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}