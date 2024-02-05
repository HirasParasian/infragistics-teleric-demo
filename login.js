
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, get, set,child, update, remove,onValue }from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBVNVvbxwwNSe4PGXsvPt6fnt02eL2Wr0",
    authDomain: "infragistics-ck.firebaseapp.com",
    databaseURL: "https://infragistics-ck-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "infragistics-ck",
    storageBucket: "infragistics-ck.appspot.com",
    messagingSenderId: "203757853179",
    appId: "1:203757853179:web:a401ace8823d69a0fad35e",
    measurementId: "G-RYYKS35443"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase()
const dbRefs = ref(db)
const analytics = getAnalytics(app);


const Register = (evt) => {   
    evt.preventDefault()  
    const dbRef = ref(db)   
    let e_email = document.getElementById("e_email").value
    let e_password = document.getElementById("e_password").value
    let e_name = document.getElementById("e_name").value
    if(!ValidateEmail(e_email) || !ValidatePassword(e_password)){
        alert("Email or Password Outta Line")
        return;
    }
    if(!ValidateField(e_name)){
        alert("Name Empty")
        return 0;
    }
    createUserWithEmailAndPassword(auth,e_email,e_password)
    .then((credential)=>{
        set(ref(db,'user/'+credential.user.uid),{
            email : e_email,
            name : e_name
        })
    }).catch((err)=>{
        alert("Failed Register")
        console.log(err)
    })
    
    
}

const SignIn = (evt) => {   
    evt.preventDefault()  
    const dbRef = ref(db)   
    let e_email = document.getElementById("e_email").value
    let e_password = document.getElementById("e_password").value
    //let e_name = document.getElementById("e_name").value
    signInWithEmailAndPassword(auth,e_email,e_password)
    .then((credential)=>{
        console.log(credential)
        get(child(dbRefs,'user/'+credential.user.uid)).then((snapshot)=>{
            if(snapshot.exists){
                sessionStorage.clear()
                sessionStorage.setItem("user-info",JSON.stringify({
                    name:snapshot.val().name,
                    email:snapshot.val().email,
                    uid:credential.user.id
                }))
            }
            window.location.href = "/index.html"
        })
    }).catch((err)=>{
        alert("Failed Register")
        console.log(err)
    })
    
    
}

const ValidateEmail = (email) => {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    console.log(expression.test(email),"email")
    return expression.test(email)
}
const ValidatePassword = (password) => {
    console.log(password.length>6,"pass")
    return password.length>6
}
const ValidateField = (field) => {
    return field != null && field.length > 0
}

let regis = document.getElementById("e_register")
regis.addEventListener('click',SignIn)
//regis.addEventListener('click',Register)



const addDummyDatas = () => {
    console.log("masuk")
    set(ref(db,'Loading/'+'13'),{
        "data": [
          {
            "CityName": "Kota Blitar",
            "ProvinsiName": "Jawa Timur",
            "Total": 5866989,
            "actMeas": "7868",
            "cap": "6767",
            "dest": "686",
            "grade": "7678",
            "haulingEq": "878",
            "measured": "87687",
            "measurement": "876786",
            "rit": "867"
          },
          {
            "CityName": "Kab. Purwakarta",
            "ProvinsiName": "Jawa Barat",
            "Total": 0,
            "actMeas": "",
            "cap": "",
            "dest": "",
            "grade": "",
            "haulingEq": "2",
            "measured": "",
            "measurement": "",
            "rit": ""
          },
          {
            "CityName": "Kab. Pamekasan",
            "ProvinsiName": "Jawa Timur",
            "Total": 0,
            "actMeas": "",
            "cap": "",
            "dest": "",
            "grade": "",
            "haulingEq": "4",
            "measured": "",
            "measurement": "",
            "rit": ""
          },
          {
            "CityName": "Kab. Bengkulu Utara",
            "ProvinsiName": "Bengkulu",
            "Total": 0,
            "actMeas": "",
            "cap": "",
            "dest": "",
            "grade": "",
            "haulingEq": "5",
            "measured": "",
            "measurement": "",
            "rit": ""
          }
        ],
        "editor": "Hiras",
        "foreman": 3714,
        "id": 13,
        "loadingEqp": "CE6164 - 6034",
        "location": "PIT KGB",
        "material": "OVERBUDEN",
        "operator": "YOHANES BENI WIJAYA",
        "production": 329.22,
        "service": "OVERBURDEN",
        "supervisor": 3714,
        "uom": "test"
      }).then(()=>{
        alert("Data Added")
    }).catch((err)=>{
        alert("Failed")
        console.log(err)
    })
}



let add = document.getElementById("e_add")
add.addEventListener('click',addDummyDatas)