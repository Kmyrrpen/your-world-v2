import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { WorldMeta } from '@/app/metas/types';
import { dispatch } from '@/app/dispatch';
import { createMeta } from '@/app/metas';
import { ThemeType, toggleTheme } from '@/app/theme';
import useTheme from '@/app/theme/hooks';

import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { ReactComponent as Sun } from '@/assets/sun.svg';
import { ReactComponent as Moon } from '@/assets/moon.svg';


type Props = {
  onToggle: () => void;
  meta: WorldMeta;
};

const SettingsModal: React.FC<Props> = ({ onToggle, meta }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [worldMeta, setWorldMeta] = useState<WorldMeta>({ ...meta });
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorldMeta((prev) => ({ ...prev, name: e.target.value }));
  };

  const onThemeChange = (theme: ThemeType) => {
    dispatch(toggleTheme(theme));
  };

  const onMetaSave = async () => {
    setIsLoading(true);
    await dispatch(createMeta(cloneDeep(worldMeta)));
    setIsLoading(false);
    onToggle();
  };

  return (
    <Modal id="world-modal">
      <Modal.ScrollFix>
        <Modal.Background onClick={onToggle} />
        <Modal.Popup size="medium">
          <div className="flex pr-2 pt-2 pb-2 pl-4">
            <span className="text-xl font-medium">SETTINGS</span>
            <Modal.CloseIcon className="ml-auto" onClick={onToggle} />
          </div>
          <div className="flex flex-col gap-3 px-4 pb-4">
            <div>
              <span className="mr-3 text-sm font-light">Theme:</span>
              <div className="flex gap-2">
                <Icon
                  onClick={() => onThemeChange('light')}
                  isActive={theme === 'light'}
                >
                  <Sun />
                </Icon>
                <Icon
                  onClick={() => onThemeChange('dark')}
                  isActive={theme === 'dark'}
                >
                  <Moon />
                </Icon>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mr-3 text-sm font-light">World Name:</label>
              <Input
                className="min-w-max flex-1"
                value={worldMeta.name}
                onChange={onNameChange}
              />
            </div>
            <Button
              className="ml-auto mt-2 w-min"
              onClick={onMetaSave}
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </Modal.Popup>
      </Modal.ScrollFix>
    </Modal>
  );
};

export default SettingsModal;
