import { useState, useEffect, useCallback, useRef } from "react";
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function ConfirmationModal({
    isOpen,
    type = "danger",
    onClose,
    title = "Confirm Action",
    message = "Are you sure you want to proceed with this action?",
    actionButton,
    cancelButtonText = "Cancel",
}) {
    const [isProcessing] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const modalRef = useRef(null);
    const cancelButtonRef = useRef(null);

    const handleEscapeKey = useCallback(
        (event) => {
            if (event.key === "Escape" && isOpen && !isProcessing) {
                onClose();
            }
        },
        [isOpen, onClose, isProcessing]
    );

    const handleTabKey = useCallback((event) => {
        if (event.key === "Tab" && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement?.focus();
                }
            }
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleEscapeKey);
            document.addEventListener("keydown", handleTabKey);
            setIsAnimating(true);

            setTimeout(() => {
                cancelButtonRef.current?.focus();
            }, 100);
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
            document.removeEventListener("keydown", handleTabKey);
        };
    }, [isOpen, handleEscapeKey, handleTabKey]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity animate-fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                ref={modalRef}
                className={`relative z-10 w-full max-w-md rounded-2xl bg-white p-4 shadow-xl ${isAnimating ? "animate-bounce-in" : ""
                    }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
                style={{
                    animation: "bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                }}
            >
                <div
                    className={`flex bg-gradient-to-r py-2 rounded-s-lg items-center text-center border-s-2 ${type === "danger"
                        ? "border-s-red-500 from-red-100 to-red-0"
                        : type === "success"
                            ? "border-s-green-500 from-green-100 to-green-0"
                            : type === "warning"
                                ? "border-s-yellow-500 from-yellow-100 to-yellow-0"
                                : "border-s-blue-500 from-blue-100 to-blue-0"
                        }`}
                >
                    <div className="mx-5">
                        {type === "danger" && (
                            <div className="rounded-full bg-white p-2">
                                <AlertTriangle className="h-6 w-6 text-red-500" />
                            </div>
                        )}
                        {type === "success" && (
                            <div className="rounded-full bg-white p-2">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                            </div>
                        )}
                        {type === "warning" && (
                            <div className="rounded-full bg-white p-2">
                                <AlertCircle className="h-6 w-6 text-yellow-500" />
                            </div>
                        )}
                        {type === "info" && (
                            <div className="rounded-full bg-white p-2">
                                <Info className="h-6 w-6 text-blue-500" />
                            </div>
                        )}
                    </div>

                    <h3 id="modal-title" className="text-lg font-medium text-gray-900">
                        {title}
                    </h3>
                </div>

                <div className="my-8 text-center">
                    <div className="text-sm text-gray-600">{message}</div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        ref={cancelButtonRef}
                        type="button"
                        className="dsz-btn-primary-outline px-2 cursor-pointer"
                        onClick={onClose}
                        disabled={isProcessing}
                        tabIndex={0}
                    >
                        {cancelButtonText}
                    </button>

                    {actionButton}
                </div>

                <style jsx>{`
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
            </div>
        </div>
    );
}