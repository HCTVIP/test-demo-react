import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from "../../redux/action/userAction";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const handleLogin = async () => {
        // validate
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
        toast.error("invalid Email");
        return;
        }

        if (!passWord) {
        toast.error("invalid Password");
        return;
        }
        // submit apis
        let data = await postLogin(email, passWord);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            navigate("/");
          }
      
          if (data && +data.EC !== 0) {
            toast.error(data.EM);
          }
    };


    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet</span>
                <button onClick={() => {navigate("/register")}}>Sign Up</button>
            </div>
            <div className="title col-4 mx-auto">
                HoiDanIt 
            </div>
            <div className="welcome col-4 mx-auto">
                Hello, who’s this?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input 
                    type={"email"} 
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                    type={"password"} 
                    className="form-control"
                    value={passWord}
                    onChange={(event) => setPassWord(event.target.value)}
                    />
                </div>
                    <span className="forgot-password">Forgot Passworld</span>
                <div>
                    <button 
                        className="btn-submit"
                        onClick={() => handleLogin()}
                    >
                        Login to HoiDanIt
                    </button>
                </div>
                <div className="text-center">
                    <span 
                    onClick={() => {navigate("/")}}
                    className="back"
                    > 
                        &#60; &#60; Go to HomePage
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login;