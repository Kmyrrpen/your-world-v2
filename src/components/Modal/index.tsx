import ModalC from './Modal';
import ModalBackground from './ModalBackground';
import ModalContainer from './ModalContainer';

const Modal = Object.assign(ModalC, {
  Background: ModalBackground,
  Container: ModalContainer,
});

export default Modal;
