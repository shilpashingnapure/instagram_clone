import Cookies from "js-cookie";


export const baseURL = process.env.NODE_ENV === 'production' ? 'https://instagram-clone-pocc.onrender.com' : 'http://localhost:4000';


const getToken = () => Cookies.get("token");

export async function methodGet(endpoint) {
  const token = getToken();
  try {
    const res = await fetch(baseURL + endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return { res, data };
  } catch (err) {
    console.error(err);
  }
}

export async function methodPost(endpoint, body) {
  const token = getToken();
  try {
    const res = await fetch(baseURL + endpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return { res, data };
  } catch (err) {
    console.error(err);
  }
}


export async function methodPatch(endpoint , body){
  const token = getToken();
  try {
    const res = await fetch(baseURL + endpoint , {
      method : 'PATCH' ,
      headers : {
        'Content-type' : 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body : JSON.stringify(body)
    })

    const data = await res.json();
    return { res , data };
  }catch(err){
    console.error(err);
  }
}

export async function methodGetById(endpoint) {
  const token = getToken();
  try {
    const res = await fetch(baseURL + endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return { res, data };
  } catch (err) {
    console.error(err);
  }
}


export async function methodDelete(endpoint){
  const token = Cookies.get("token");
  try {
    const  res = await fetch(baseURL + endpoint , {
      method : 'DELETE' ,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    const data = await res.json();
    return { res , data };
  } catch(err){
    console.error(err);
  }
}
