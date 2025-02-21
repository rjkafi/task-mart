
import { createContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create A new User
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Sign In With Google   
    const signInWithGoogle = () => {

        return signInWithPopup(auth, googleProvider)

            .then(result => {
                const user = result.user;
                setUser(user);
            }).catch(error => {
                console.error("Google login failed:", error.message);

            });
    }
       // Sign in with email & password
       const signInUser= (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }
    // signout
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        loading, setLoading

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;