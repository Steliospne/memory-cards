'use client';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SettingsIcon } from 'lucide-react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { useGlobalData } from '@/context/global-context';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export default function Settings() {
  const { globalState } = useGlobalData();
  const { state, handler } = globalState;
  const { bgMusic, clickSound } = state;
  const { toggleClickSound } = handler;
  const [activateClickSound, setActivateClickSound] = useState<Checked>(true);
  const [activateBGMusic, setActivateBGMusic] = useState<Checked>(true);
  const [showMenu, setShowMenu] = useState(false);

  function handleClickSound(checked: boolean) {
    if (!checked) {
      toggleClickSound(false);
    } else {
      toggleClickSound(true);
    }
    setActivateClickSound(checked);
  }

  function handleBgMusic(checked: boolean) {
    if (!checked) {
      bgMusic.audio?.pause();
    } else {
      bgMusic.audio?.play();
    }
    setActivateBGMusic(checked);
  }

  return (
    <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
      <DropdownMenuTrigger
        asChild
        onPointerDown={() => clickSound.audio?.play()}
      >
        <Button
          size='icon-lg'
          variant='ghost'
          className='text-gold-4 hover:text-gold-4/80 absolute top-8 right-8 scale-200 hover:scale-180 max-sm:top-4 max-sm:right-4 max-sm:scale-120'
          disableClickSound
        >
          <SettingsIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-hextech-black text-gold-4 border-gold-4 rounded-none border-4'>
        <DropdownMenuLabel>Sound</DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-gold-4' />
        <DropdownMenuCheckboxItem
          checked={activateClickSound}
          onCheckedChange={handleClickSound}
          onSelect={(e) => e.preventDefault()}
          className='hover:bg-gold-4/80! hover:text-hextech-black focus:bg-gold-4/80!'
        >
          Click Sound Effect
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activateBGMusic}
          onCheckedChange={handleBgMusic}
          onSelect={(e) => e.preventDefault()}
          className='hover:bg-gold-4/80! hover:text-hextech-black focus:bg-gold-4/80!'
        >
          Background Music
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
