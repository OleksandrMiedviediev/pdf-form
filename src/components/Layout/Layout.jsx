import Loader from "../Loader/Loader.jsx"
import Navigation from "../Navigation/Navigation.jsx"
import {Suspense} from 'react'

export default function Layout({children}) {
    return (
        <div>
            <Navigation />
            <Suspense fallback={<Loader/>} >
            {children}
            </Suspense>
        </div>
    )
}