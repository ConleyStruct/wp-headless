import Nav from "./nav";
import { isEmpty } from 'lodash';

const Header = ({ headerMenu }: any) => {
    if (isEmpty(headerMenu)) {
        return null;
    }
    
    return (
        <header>
            <Nav headerMenu={headerMenu}/>
        </header>
    )
}

export default Header;