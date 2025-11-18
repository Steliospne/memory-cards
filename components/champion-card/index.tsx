import { Champion } from '@/types/models';
import Image from 'next/image';
import s from './card.module.css';
import { cn } from '@/lib/utils';
import SmallLogo from '@/public/assets/league-S.png';
import { cva, type VariantProps } from 'class-variance-authority';
import useCardState from '@/hooks/use-card-state';
import { useGlobalData } from '@/context/global-context';
import { memo } from 'react';

const cardVariants = cva('absolute h-full flex items-center', {
  variants: {
    variant: {
      iconic: 'bg-linear-to-tr from-blue-7 via-cyan-900 to-gold-6',
      hextech: 'bg-linear-to-tr from-indigo-950 via-blue-700 to-cyan-400',
      classic: 'bg-linear-to-tr from-gold-6 via-blue-7 to-grey-cool',
    },
  },
  defaultVariants: {
    variant: 'classic',
  },
});

interface ChampionCardProps {
  className?: string;
  champion: Champion;
  flipped: boolean;
  onClick: (clicked: boolean) => void;
  style?: React.CSSProperties;
}

const ChampionCard = memo(function MemoCard({
  className,
  champion,
  flipped,
  style,
  variant,
  onClick,
}: ChampionCardProps & VariantProps<typeof cardVariants>) {
  const { state, handler } = useCardState();
  const { clicked } = state;
  const { setClicked } = handler;

  function handleCardClick() {
    onClick(clicked);
    setClicked(true);
  }

  return (
    <div
      className={cn(
        s.card_container,
        'aspect-11/20 w-[125px] shadow hover:scale-105',
        className,
      )}
      onClick={handleCardClick}
      style={style}
    >
      <div
        className={cn(
          s.card,
          flipped && s.flipped,
          'border-gold-4 relative h-full border-4',
        )}
      >
        <div className={cn(s.card_front, 'absolute h-full')}>
          <Image
            alt={champion.name + ' image.'}
            src={champion.imageURL}
            width={125}
            height={0}
            className='h-full object-cover'
            loading='eager'
          />
        </div>
        <div className={cn(s.card_back, cardVariants({ variant }))}>
          <Image
            alt={'Card back.'}
            src={SmallLogo}
            width={125}
            height={0}
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
});

export default ChampionCard;
