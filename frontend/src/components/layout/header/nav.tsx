import Link from 'next/link'
import DropdownIcon from '../icons/dropdown-icon';
import client from '@/src/apollo/client';
import { GET_MENUS } from '@/src/queries/get-menus';
import classnames from 'classnames';

const Nav = (props?: NavProps) => {
    const { headerMenu } = props.menus;
    let { menuOpenStatus, menuVisible } = props;

    const handleSubMenuOpen = ( event: MouseEvent, parentMenuId: string ): void => {
		event.stopPropagation();

        const isOpen = menuOpenStatus[ parentMenuId ].isOpen;
		menuOpenStatus[ parentMenuId ] = { isOpen: !isOpen };
	};

	const menuButtonClasses = classnames(
		'header-nav-menu-btn hamburger header-nav__menu-btn hamburger--slider',
		{
			'is-active': menuVisible
		}
	);

    const toggleMenu = () => {
		menuVisible =!menuVisible;
		document.body.classList.toggle( 'mobile-menu-open' );
	};

    return (
        <>
        
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="18"><mask height="180" id=":r8:mask0_408_134" maskUnits="userSpaceOnUse" width="180" x="0" y="0"><circle cx="90" cy="90" fill="black" r="90"></circle></mask><g mask="url(#:r8:mask0_408_134)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#:r8:paint0_linear_408_134)"></path><rect fill="url(#:r8:paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect></g><defs><linearGradient gradientUnits="userSpaceOnUse" id=":r8:paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id=":r8:paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient></defs></svg>
                <span className="font-semibold text-xl tracking-tight">Tailwind</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" data-cy="mmenu-btn">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
					</svg>
                </button>
            </div>
            <div className="overflow-hidden w-full lg:h-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    { headerMenu?.length ? (
                        headerMenu?.map((item: any) => {
                            const hasChildren = null !== item.node.childItems.edges ? item.node.childItems.edges.length: false;
                            const parentMenuLink = (
                                <Link 
                                  href={item.node?.path} 
                                  key={item.node?.id}
                                  className={`block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 ${
                                    hasChildren ? 'menu-has-children' : ''
                                  }` }
                                >
                                    { item.node.label }
                                </Link>
                            );
                            return (
                                <div 
                                  key={item.node?.id} 
                                  className={ `text-sm lg:flex-grow header-nav__menu-item ${
                                    hasChildren
                                        ? 'menu-has-children'
                                        : ''
                                  } ${
                                    menuOpenStatus[item.node.id].isOpen
                                        ? 'child-menu-open'
                                        : ''
                                  }` }
                                >
                                    { hasChildren? (
                                        <span className="header-nav__menu-link-container-with-arrow">
                                            { parentMenuLink }
                                            <button
                                                className="header-nav__toggle-menu-btn icon-button"
                                                onClick={ ( event: any ) => handleSubMenuOpen( event, item.node.id ) }
                                                onKeyDown={ ( event: any ) => handleSubMenuOpen( event, item.node.id ) }
                                            >
                                                <DropdownIcon />
                                            </button>
                                        </span>
                                    ) : (
                                        parentMenuLink
                                    )}
                                    
                                    { hasChildren? (
                                        <div 
                                          className={`header-nav__submenu ${
                                             menuOpenStatus[item.node.id].isOpen
                                               ? 'child-menu-open'
                                                : ''
                                          }`}>
                                            
                                            { item.node.childItems.edges.map((childItem: any) => {
                                                return (
                                                    <Link 
                                                      href={childItem.node?.path} 
                                                      key={childItem.node?.id}
                                                      className="header-nav__submenu-item block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                                                    >
                                                        { childItem.node.label }
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    ) : null }
                                    
                                </div>
                            )
                        })
                    ) : (
                        <div className="text-sm lg:flex-grow">
                            <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Home</a>
                            <a href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">About</a>
                            <a href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Contact</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>

        // Burger Menu

        <button
          className={menuButtonClasses}
          type="button"
          onClick={toggleMenu}
          onKeyDown={toggleMenu}
        >
            <span className="hamburger-box">
                <span className="hamburger-inner">
                    <span className="screen-reader-text">Toggle Menu</span>
                </span>
            </span>
        </button>
        </>
    );
}

interface NavProps {
    menus: {
        headerMenu: any[];
        footerMenu: any[];
    }
    menuOpenStatus: Record<string, { isOpen: boolean }>
    menuVisible: boolean;
}
export async function getStaticProps() {
	const { data, loading, networkStatus } = await client.query({
	  query: GET_MENUS,
	});

    const headerMenu = data?.headerMenu?.edges;
    const newMenuState: Record<string, { isOpen: boolean }> = {};

    if ( Object.keys( headerMenu.edges ).length ) {
        headerMenu.edges.forEach((item: any) => {
            newMenuState[ item.node.menuItemId ] = { isOpen: false };
        })
    }
  
	return {
	  props: {
        menus: {
            headerMenu: headerMenu,
            footerMenu: data?.footerMenu?.edges,
        },
        menuOpenStatus: newMenuState,
        menuVisible: false,
	  },
	};
  }

export default Nav;