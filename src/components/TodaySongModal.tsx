import { Modal, ModalProps } from 'react-native';
import TodaySongCard from './TodaySongCard';

const TodaySongModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <TodaySongCard />
    </Modal>
  );
};

export default TodaySongModal;
