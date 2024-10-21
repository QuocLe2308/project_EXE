import { Modal, ModalBody } from "reactstrap";

type DetailModalProps = {
  isCloseDetail: boolean;
  setIsCloseDetail: any;
};

const DetailModal = ({ isCloseDetail, setIsCloseDetail }: DetailModalProps) => {
  return (
    <>
      <Modal isOpen={true}>
        <ModalBody>
          <div>
            <h1>Thông Tin Chi Tiết</h1>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DetailModal;
