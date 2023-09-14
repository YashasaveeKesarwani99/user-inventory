// higher order component to deliver child components

import { BiUserCircle }  from 'react-icons/bi'
import './layout.sass'
import { userInventory } from '../../config/constants'

const Layout = ({children}) => {

    return(
        <>
        <div className='container'>
            <div >{userInventory.toUpperCase()}</div>
            <div>
                <BiUserCircle/>
            </div>
        </div>
        {children}
        </>
    )    

}

export default Layout;