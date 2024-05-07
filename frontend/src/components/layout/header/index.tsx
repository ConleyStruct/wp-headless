import Nav from "./nav";
import { isEmpty } from 'lodash';

const Header = ({ headerMenu }: any) => {
    if (isEmpty(headerMenu)) {
        return null;
    }
    
    return (
        <header>
            <Nav heaederMenu={headerMenu}/>
        </header>
    )
}

export default Header;