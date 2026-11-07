import type { ReactNode } from 'react'
import ExternalModal from 'react-modal'

ExternalModal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '520px',
    maxHeight: '90vh',
    borderRadius: '12px',
    padding: '24px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
}

interface ModalProps {
  isModalOpen: boolean
  closeModal: () => void
  children: ReactNode
}

export default function Modal({ isModalOpen, closeModal, children }: ModalProps) {
  return (
    <ExternalModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Janela"
    >
      {children}
    </ExternalModal>
  )
}