import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/navbar.css'
import { motion, AnimatePresence } from 
'framer-motion';
import { yugiohLogo, menu, close } from '../assets/index.js'

export const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 630);
  const [LinksMenuToggle, SetLinksMenuToggle] = useState(false)

  const isAdmin = user?.role === "Admin"

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setIsScreenSmall(newWidth < 630);

      if (newWidth > 630) {
        SetLinksMenuToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const logout = () => {
  sessionStorage.clear();
  SetLinksMenuToggle(false);
  window.location.href = "/login";
};

  return (
    <motion.div 
    initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
    className='navbar_container'>
      <div className='navbar_inner'>
        <div className='logo_container'>
          <img src={yugiohLogo} alt="yugioh"/>
        </div>

        <div className='links_container'>
          {!isScreenSmall ? (
            <>
              <Link to="/" className='link hover-underline-animation'>Home</Link>
              <Link to="/shop" className='link hover-underline-animation'>Shop</Link>
              <Link to="/collection" className='link hover-underline-animation'>Collection</Link>
              {isAdmin && (<Link to="/admin-dashboard" className='link hover-underline-animation'>Admin Dashboard</Link>)}
              
              {!user ? 
                <Link to="/login" className='login_btn light'>
                  Login
                </Link> : 
                <button onClick={() => logout()} className='login_btn'>Logout</button>
              }
            </>
          ) : (
            <>
              <img 
                src={LinksMenuToggle ? close : menu} 
                alt="" 
                onClick={() => SetLinksMenuToggle(!LinksMenuToggle)} 
                className="menu-icon"
              />

              <AnimatePresence>
                {LinksMenuToggle && (
                  <motion.div
                    key="menu"
                    initial={{ x: 600 }}
                    animate={{ x: 0 }}
                    exit={{ x: 600 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className='hidden_menu_container'
                  >
                    <div className='hidden_links_container'>
                      <Link to="/" className='link hover-underline-animation' onClick={() => SetLinksMenuToggle(false)}>Home</Link>
                      <Link to="/shop" className='link hover-underline-animation' onClick={() => SetLinksMenuToggle(false)}>Shop</Link>
                      <Link to="/collection" className='link hover-underline-animation' onClick={() => SetLinksMenuToggle(false)}>Collection</Link>
                      {isAdmin && (<Link to="/admin-dashboard" className='link hover-underline-animation'>Admin Dashboard</Link>)}
                      {!user ? 
                        <Link to="/login" className='login_btn light'>
                          Login
                        </Link> : 
                        <button onClick={() => logout()} className='login_btn'>Logout</button>
                      }
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
