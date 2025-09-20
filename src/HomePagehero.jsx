"use client";
import { motion } from "framer-motion";

function HomePagehero() {
  return (
    <motion.section
      initial={{ scale: 1.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 50,   // 🎯  elasticity
        damping: 20,     // 🎯  settle speed
      }}
      className="h-[85vh] bg-cover bg-center flex items-end p-6 
      bg-[url('https://wallpapers.com/images/hd/movie-poster-background-q1zm830g0hfww2lk.jpg')]"
    >
      {/* 📌 Hero Content (overlay) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: "easeOut", 
          delay: 1 
        }}
        className="max-w-lg py-10"
      >
      </motion.div>
    </motion.section>
  );
}

export default HomePagehero;
