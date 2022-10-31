import ModalComponent from './Modal';
import ModalBackground from './ModalBackground';
import ModalCloseIcon from './ModalCloseIcon';
import ModalPopup from './ModalPopup';
import ModalScrollFix from './ModalScrollfix';

const Modal = Object.assign(ModalComponent, {
  Popup: ModalPopup,
  ScrollFix: ModalScrollFix,
  CloseIcon: ModalCloseIcon,
  Background: ModalBackground,
});

export default Modal;
