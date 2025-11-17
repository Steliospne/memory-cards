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
      className={cn(s.card_container, ' shadow w-[125px] aspect-11/20')}
      onClick={onClick}
      style={style}
    >
      <div
        className={cn(
          s.card,
          flipped && s.flipped,
          'relative h-full border-yellow-600 border-4'
        )}
      >
        <div className={cn(s.card_front, 'absolute h-full')}>
          <Image
            alt={champion.name + ' image.'}
            src={champion.imageURL}
            width={125}
            height={0}
            className='h-full object-cover'
          />
        </div>
        <div
          className={cn(
            s.card_back,
            'absolute',
            'bg-black h-full w-full flex items-center justify-center'
          )}
        >
          <Image alt={'Card back.'} src={SmallLogo} width={125} height={0} />
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;
