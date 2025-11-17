import { Champion } from '@/types/models';
import Image from 'next/image';
import s from './card.module.css';
import { cn } from '@/lib/utils';
import SmallLogo from '@/public/assets/league-S.png';

const ChampionCard = ({
  champion,
  flipped,
  style,
  onClick,
}: {
  champion: Champion;
  flipped: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}) => {
  console.log('render', flipped);
  return (
    <div
      className={cn(
        s.card_container,
        'border-yellow-500 border-4 shadow w-[125px] aspect-11/20'
      )}
      onClick={onClick}
      style={style}
    >
      <div className={cn(s.card, flipped && s.flipped, 'relative  h-full')}>
        <div className={cn(s.card_front)}>
          <Image
            alt={champion.name + ' image.'}
            src={champion.imageURL}
            fill
            className=''
          />
        </div>
        <div className={cn(s.card_back, ' bg-black h-full w-full')}>
          <Image alt={'Card back.'} src={SmallLogo} fill className='' />
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;
