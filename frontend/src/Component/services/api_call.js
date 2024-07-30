const baseURL = "http://localhost:4000";

export async function methodGet(endpoint) {
  try {
    const res = await fetch(baseURL + endpoint, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    return { res, data };
  } catch (err) {
    console.error(err);
  }
}

export async function methodPost(endpoint, body) {
  try {
    const res = await fetch(baseURL + endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return { res, data };
  } catch (err) {
    console.error(err);
  }
}


export async function methodPatch(endpoint , body){
  try {
    const res = await fetch(baseURL + endpoint , {
      method : "PATCH" ,
      headers : {
        "Content-type" : "application/json"
      },
      credentials : "include" ,
      body : JSON.stringify(body)
    })

    const data = await res.json();
    return { res , data };
  }catch(err){
    console.error(err);
  }
}

export async function methodGetById(endpoint) {
  try {
    const res = await fetch(baseURL + endpoint, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return { res, data };
  } catch (err) {
    console.error(err);
  }
}


export async function methodDelete(endpoint){
  try {
    const  res = await fetch(baseURL + endpoint , {
      method : 'DELETE' ,
      credentials : "include"
    })
    const data = await res.json();
    return { res , data };
  } catch(err){
    console.error(err);
  }
}
