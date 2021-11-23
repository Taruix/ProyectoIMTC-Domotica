//Importar
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, set, child, get  } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtYNSrPPAqVqirGD4piNgjZHYZgZ2daME",
  authDomain: "pruebas-6e3ae.firebaseapp.com",
  databaseURL: "https://pruebas-6e3ae-default-rtdb.firebaseio.com",
  projectId: "pruebas-6e3ae",
  storageBucket: "pruebas-6e3ae.appspot.com",
  messagingSenderId: "733508773826",
  appId: "1:733508773826:web:6017a7d376212eeb99985b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Funciones

function estado(userId) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      LuzEstado: luz.checked,
      LockEstado: lock.checked
    });
}
function ventA(userId,e) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      VentiladorEstado: e
    });
}

//Declarar
const luz = document.getElementById("luz");

const lock = document.getElementById("lock");

const vent0 = document.getElementById("btnradio0");
const vent1 = document.getElementById("btnradio1");
const vent2 = document.getElementById("btnradio2");
const vent3 = document.getElementById("btnradio3");


//Leer valores base de la datos y actualizarlos en la interfaz
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${"1"}`)).then((snapshot) => {
  if (snapshot.exists()) {
    var estados = snapshot.val();
    console.log(estados.LuzEstado);
  } else {
    console.log("No data available");
  }

  if(estados.LuzEstado){
    luz.setAttribute("checked","true");
  }

  if(estados.LockEstado){
    lock.setAttribute("checked","true");
  }
}).catch((error) => {
  console.error(error);
});
get(child(dbRef, `users/${"2"}`)).then((snapshot) => {
    if (snapshot.exists()) {
      var estados = snapshot.val();
      console.log(estados.VentiladorEstado);
    } else {
      console.log("No data available");
    }
  
    if(estados.VentiladorEstado == 0){
        vent0.setAttribute("checked","true");
    }
    if(estados.VentiladorEstado == 1){
        vent1.setAttribute("checked","true");
    }
    if(estados.VentiladorEstado == 2){
        vent2.setAttribute("checked","true");
    }
    if(estados.VentiladorEstado == 3){
        vent3.setAttribute("checked","true");
    }
  }).catch((error) => {
    console.error(error);
  });


//Leer valores de la interfaz y subirlos a la base de datos

luz.addEventListener("click",()=>{
    estado("1");
});

lock.addEventListener("click",()=>{
    estado("1");
});

vent0.addEventListener("click",()=>{
    ventA("2",0);
});
vent1.addEventListener("click",()=>{
    ventA("2",1);
});
vent2.addEventListener("click",()=>{
    ventA("2",2);
});
vent3.addEventListener("click",()=>{
    ventA("2",3);
});
