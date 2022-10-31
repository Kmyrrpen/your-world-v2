import { useState } from 'react';
import Icon from '@/components/IconHighlight';
import { ReactComponent as SettingIcon } from '@/assets/settings.svg';
import Modal from '@/components/Modal';

const WorldSettings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    document.body.classList.toggle('overflow-hidden');
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="ml-auto md:order-3 md:ml-0">
      <Icon onClick={onToggle}>
        <SettingIcon className="w-full" />
      </Icon>
      <Modal className={`${!isOpen ? 'hidden' : ''}`}>
        <Modal.ScrollFix>
          <Modal.Background onClick={onToggle} />
          <Modal.Popup>
            <div className="flex">
              <Modal.CloseIcon className="ml-auto" onClick={onToggle} />
            </div>
            <p>asdasdasdas</p>
          </Modal.Popup>
        </Modal.ScrollFix>
      </Modal>
    </div>
  );
};

export default WorldSettings;
