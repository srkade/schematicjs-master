import { useState } from "react";

interface LoginPageProps{
    onLoginSuccess:()=>void;
}

export default function LoginPage({onLoginSuccess}:LoginPageProps){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const[error,setError]=useState("");

    const handleLogin=(e:React.FormEvent)=>{
        e.preventDefault();
        if(username==="admin" && password==="admin123")
        {
            onLoginSuccess();
            alert("Login Success")
        }
        else{
            setError("Invalid username or password");
        }
    }


  return (
    <div
     style={{ display: "flex",
      justifyContent: "center",
       alignItems: "center", 
       height: "100vh", 
       background: "#f4f6f9",
       width:"100%" }}>

      <form 
      onSubmit={handleLogin} 
      style={{ background: "white", 
      padding: "50px", 
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      width: "530px",
      height:"400px" ,}}>

        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize:"50px" }}>Login Form</h2>

        <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} 
        style={{ width: "85%", padding: "20px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc",marginLeft:"10px" }} />
        <br></br><br></br>

        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} 
        style={{ width: "85%", padding: "20px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" ,marginLeft:"10px"}} />
        <br></br><br></br>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <button type="submit"
         style={{ width: "60%", 
         padding: "20px",
          borderRadius: "8px", 
          border: "none",
           background: "#007bff", 
           color: "white", 
           fontWeight: "bold" ,
           marginLeft:"100px"}}>Login</button>
      </form>
    </div>
  );
}