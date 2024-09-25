import { motion } from "framer-motion";
import Image from "next/image";

function Card({ champion, onClick }) {
  return (
    <motion.div
      layout
      transition={{ type: "tween", duration: 1 }}
      className='card'
      id={champion.name}
      onClick={onClick}
    >
      <Image alt='champion logo' src={champion.img} width={100} />
      <h4>{champion.name}</h4>
    </motion.div>
  );
}

export default Card;
