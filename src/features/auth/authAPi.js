export async function signUpApi (data){
  const {firstName,lastName,email,phone,password} = data
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signUp`,{
    method:"POST",
    headers:{   
      "Content-Type":"application/json"
    },
    body:JSON.stringify({firstName,lastName,email,phone,password})
  }).then((res)=>{
    
    return res.json()
  }).then((data)=>{ 
    
    return data
  })
}
export async function loginApi (data){
  const {email,password} = data
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`,{
    method:"POST",
    headers:{   
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  }).then((res)=>{
    return res.json()
  }).then((data)=>{ 
    return data
  }).catch((e)=>{
    return e
  })
}