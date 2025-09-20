import { useCallback, useRef, useState } from "react";

export default function useModal() {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef<HTMLDialogElement>(null);
	

	const toggleModal = useCallback(() => {
		if (!modalRef.current) return;

		if (modalRef.current.hasAttribute("open")) {
			modalRef.current.close();
		} else {
			modalRef.current.showModal();
		}
		setIsOpen((prev) => !prev);
	}, []);

	const closeModal = useCallback(() => {
		if (modalRef.current) {
			modalRef.current.close();
			setIsOpen(false);
		}
	}, []);

	return {
		isOpen,
		modalRef,
		toggleModal,
		closeModal,
	};
}
