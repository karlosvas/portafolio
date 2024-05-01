import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
// Configuración firebase
const firebaseConfig = {
    apiKey: "AIzaSyAtXaHrW9rvbCrMHNgW-b7-WdbtSfNRihw",
    authDomain: "portfolio-karlos.firebaseapp.com",
    projectId: "portfolio-karlos",
    storageBucket: "portfolio-karlos.appspot.com",
    messagingSenderId: "721345184295",
    appId: "1:721345184295:web:17844144bd5103a4b10402",
    measurementId: "G-VXMFHQDBNC"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// Estado de los botones de login
export function stateAuthFirebase(id) {
    const loginButton = document.getElementById('login');
    const formTitle = document.getElementById('formTitle');
    if (loginButton && formTitle) {
        onAuthStateChanged(auth, user => {
            if (id == 'login') {
                if (user == null) {
                    loginButton.textContent = 'Login';
                    formTitle.textContent = 'Login';
                }
                else {
                    loginButton.textContent = 'Logout';
                }
            }
            if (id == 'register')
                formTitle.textContent = 'Register';
        });
    }
}
// Verificar si actualmente está logeado
export const isLogged = () => {
    return auth.currentUser != null;
};
// Guithub login
const providerGithub = new GithubAuthProvider();
export function githubSingIn() {
    // Inicio de sesión con provedores externos
    signInWithPopup(auth, providerGithub)
        .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        document.getElementById('modal')?.classList.toggle('hidden');
    }).catch((error) => {
        // Handle Errors here.
        console.error(error.code, error.message);
        // El tipo de AuthCredential que esta utilizando y el email que el usuario utilizando.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.error(credential, error.customData.email);
    });
}
// Logearse localmente
export function localSingin(email, password, resData, type) {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Usuario autenticado correctamente
        const user = userCredential.user;
        console.log("Usuario autenticado:", user);
        resData.innerHTML = `User ${type} in successfully ✅`;
        // Si el modal es visible, se actualiza el esatdo de los botones y se oculta el modal
        if (!document.getElementById('modal')?.classList.contains('hidden')) {
            setTimeout(() => {
                document.getElementById('modal')?.classList.add('hidden');
                stateAuthFirebase('login');
                resData.innerHTML = '';
                document.getElementsByTagName('main')[0].classList.toggle('opacity-50');
            }, 2000);
        }
    })
        .catch((error) => {
        // Ocurrió un error durante la autenticación
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error durante la autenticación:", errorMessage);
        console.error(errorCode);
        resData.innerHTML = `User ${type} in unsuccessfully ❌`;
    });
}
// Deslogearse
export function signOutUser() {
    signOut(auth)
        .then(() => {
        // El usuario se ha desconectado exitosamente
        console.log("Usuario desconectado exitosamente");
    })
        .catch((error) => {
        // Manejar errores de desconexión
        console.error("Error al desconectar al usuario:", error);
    });
}
export function localRegister(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Usuario registrado correctamente
        const user = userCredential.user;
        console.log("Usuario registrado:", user);
    })
        .catch((error) => {
        // Ocurrió un error durante el registro del usuario
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error durante el registro:", errorMessage);
        console.error(errorCode);
    });
}
//# sourceMappingURL=oauth2-0.js.map