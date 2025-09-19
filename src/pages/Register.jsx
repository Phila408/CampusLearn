
// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";
import { register } from "../api/auth";

export default function Register(){
  const nav = useNavigate();
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("student");
  const [loading,setLoading] = useState(false);
  const [toast,setToast] = useState({type:"info", message:""});

  const onSubmit = async (e)=>{
    e.preventDefault(); setLoading(true); setToast({type:"info", message:""});
    try{
      const { accessToken, user } = await register({ fullName, email, password, role });
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setToast({type:"success", message:"Account created! Redirecting..."});
      setTimeout(()=>nav("/"), 700);
    }catch(err){
      setToast({type:"error", message: err.message || "Failed to register"});
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-4 login-gradient">
      <Toast type={toast.type} message={toast.message} onClose={()=>setToast({type:'info',message:''})}/>
      <div className="w-full max-w-md bg-white/95 border rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-1 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-5">Join CampusLearn to ask and answer questions</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <div className="label">Full Name</div>
            <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} required/>
          </div>
          <div>
            <div className="label">Email</div>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          </div>
          <div>
            <div className="label">Password</div>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          </div>
          <div>
            <div className="label">Role</div>
            <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>
          <button className={`btn btn-primary w-full ${loading?"opacity-80 pointer-events-none":""}`} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-700 font-semibold hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
