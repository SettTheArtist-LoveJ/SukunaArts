import { useState } from "react";

export default function Secret() {

const [password,setPassword] = useState("");
const [access,setAccess] = useState(false);

function checkPassword(){
if(password === "12345678"){
setAccess(true);
}else{
alert("Contraseña incorrecta");
}
}

if(access){
return(
<div style={{textAlign:"center",marginTop:"100px"}}>
<h1>🔓 Bienvenido al área secreta</h1>
<p>Aquí puedes poner juegos ocultos o contenido secreto.</p>
</div>
)
}

return(
<div style={{textAlign:"center",marginTop:"100px"}}>
<h2>🔒 Área Secreta</h2>
<p>Introduce la contraseña de 8 dígitos</p>

<input
type="password"
maxLength={8}
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{padding:"10px",marginTop:"10px"}}
/>

<br/>

<button onClick={checkPassword} style={{marginTop:"15px"}}>
Entrar
</button>

</div>
)
}
