// higher order component to render child components
import './layout.sass'
import { BiUserCircle }  from 'react-icons/bi'
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