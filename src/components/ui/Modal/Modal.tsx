"use client";

import { RemoveScroll } from "react-remove-scroll";

type ModalProps = {
	open: boolean;
	toggleModal: () => void;
	children: React.ReactNode;
	ref?: React.RefObject<HTMLDialogElement | null>;
};

export default function Modal({ open, toggleModal, children, ref }: ModalProps) {
	return (
		<dialog
			className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 overflow-y-auto
				opacity-0 transition-all transition-discrete open:scale-100 open:opacity-100
				starting:open:scale-125 starting:open:opacity-0"
			onClick={(e) => e.currentTarget === e.target && toggleModal()}
			onKeyDown={(e) => e.key === "Escape" && toggleModal()}
			ref={ref}
		>
			<RemoveScroll enabled={open}>
				<div
					className="max-h-[80vh] min-w-[80vw] space-y-3 overflow-x-hidden overflow-y-auto
						p-6 lg:min-w-auto"
				>
					{children}
				</div>
			</RemoveScroll>
		</dialog>
	);
}
