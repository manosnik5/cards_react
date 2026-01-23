import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import '../styles/home.css'



export const Home = () => {

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  if (user && token) {
    console.log(user,token);
  } else {
    console.log("Ο χρήστης δεν είναι συνδεδεμένος.");
  }
  return (
    <div>
      <div className='home_container'>
        <div className='homeLogo_container'>
          <motion.div 
            initial={{opacity: 0, }}
            animate={{opacity: 1,  }}
            transition={{ duration: 2 }}
            className='packCard_group'>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
          </motion.div>
        </div>
        <div className='text_container'>
          <div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}>
            <h1
            initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1 }}
              >Yugioh Card Simulator</h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}>
              Yugioh Card Simulator lets you collect, unlock and explore Yu-Gi-Oh cards. Build your personal collection, open booster packs and discover rare cards!
            </motion.p>
            <Link to="/shop">
             <motion.button 
              whileHover={{ background: 'hsl(0, 0%, 75%)',transition: { duration: 0} }}
              whileTap={{ scale: 0.985 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='home_btn light'
            >
              Start
            </motion.button></Link>
           
          </div>
        </div>
        
      </div>
    </div>

  )
}
