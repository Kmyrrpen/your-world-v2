import React, { useState } from 'react';
import { ReactComponent as SettingIcon } from '@/assets/settings.svg';
import Icon from '@/components/Icon';

import { useCurrentMeta } from '@/app/metas/hooks';
import SettingsModal from './SettingsModal';

const WorldSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentMeta = useCurrentMeta();

  const onToggle = () => {
    document.body.classList.toggle('overflow-hidden');
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="ml-auto md:order-3 md:ml-0">
      <Icon
        onClick={onToggle}
        aria-controls="world-modal"
        aria-expanded={isOpen}
      >
        <SettingIcon className="w-full" />
      </Icon>
      {isOpen ? <SettingsModal meta={currentMeta} onToggle={onToggle} /> : null}
    </div>
  );
};

export default WorldSettings;
