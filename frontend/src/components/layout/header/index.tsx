import Nav from "./nav";
import { isEmpty } from 'lodash';

const Header = ({ headerMenu }: any) => {

    return (
        <header>
            <Nav />
        </header>
    )
}

export default Header;