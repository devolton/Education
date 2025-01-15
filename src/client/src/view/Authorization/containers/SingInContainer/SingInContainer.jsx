import {useState} from "react";
import {useAuth} from "../../../../contexts/AuthContext";
import {Link} from "react-router-dom";

export default function SingInContainer(){
    const [userLogin,setLogin] =useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const {isAuthenticated, singIn} = useAuth();

    return(<div className="px-5 py-5 p-lg-0 mt-3">
            <div className="d-flex justify-content-center">
                <div
                    className="col-12 col-md-9 col-lg-7 min-h-lg-screen d-flex flex-column justify-content-center py-lg-16 px-lg-20 position-relative">
                    <div className="row">
                        <div className="col-lg-10 col-md-9 col-xl-7 mx-auto">
                            <div className="text-center mb-12">
                                <span className="d-inline-block d-lg-block h1 mb-lg-6 me-3">👋</span>
                                <h1 className="ls-tight font-bolder h2">
                                    Sing in!
                                </h1>
                                <p className="mt-2">Please, register account </p>
                            </div>
                            <form>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name"
                                           placeholder="Your name"
                                           value={name}
                                           onChange={(e)=>{setName(e.target.value)}}


                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="surname">Surname</label>
                                    <input type="text" className="form-control" id="surname"
                                           placeholder="Your surname"
                                           value={surname}
                                           onChange={(e)=>{setSurname(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="email">Middlename</label>
                                    <input type="text" className="form-control" id="middleName"
                                           placeholder="Your middlename"
                                           value={middleName}
                                           onChange={(e)=>{setMiddleName(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="login">Login</label>
                                    <input type="text" className="form-control" id="login"
                                           placeholder="Your login"
                                           value={userLogin}
                                           onChange={(e)=>{setLogin(e.target.value)}}

                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id="email"
                                           placeholder="Your email"
                                           value={email}
                                           onChange={(e)=>{setEmail(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password"
                                           autoComplete="current-password"
                                           value={password}
                                           onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="password">Confirm password</label>
                                    <input type="password" className="form-control" id="confirm_password" placeholder="Confirm password"
                                           autoComplete="current-password"
                                           value={confirmPassword}
                                           onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                    />
                                </div>
                            </form>
                            <div className='d-flex flex-column  justify-content-around align-items-center'>
                                <button type={'button'} onClick={()=>{singIn(name,surname,middleName,userLogin,email,password, confirmPassword)}} className='btn btn-primary w-25'>Sign in</button>
                                <div className="my-6 mb-4 mt-4">
                                    <small>Have an account?</small>
                                    <Link to='/auth/login' className="text-warning text-sm font-semibold">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}