import Loader from "../Loader/Loader.jsx"
import Navigation from "../Navigation/Navigation.jsx"
import {Suspense} from 'react'
import css from "./Layout.module.css"
import Footer from "../Footer/Footer.jsx"


export default function Layout({children}) {

    return (
        
        <div>
            <header>
                <Navigation />
            </header>
            <main>
                <Suspense fallback={<Loader/>} >
                    {children}
                </Suspense>
            </main>
            <footer className={css.footer}>
                <Footer/>
            </footer>
        </div>
        
        
    )
}