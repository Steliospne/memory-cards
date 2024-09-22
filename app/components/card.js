import Image from "next/image";

function Card({ champion, onClick }) {
  return (
    <div className='card' id={champion.name} onClick={onClick}>
      <Image alt='champion logo' src={champion.img} width={100} />
      <h4>{champion.name}</h4>
    </div>
  );
}

export default Card;
