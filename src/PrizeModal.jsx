import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './PrizeModal.css';

export default function PrizeModal({ prize, onClaim, onClose }) {
    useEffect(() => {
        // small celebratory confetti wave when modal mounts
        confetti({
            particleCount: 90,
            spread: 55,
            origin: { y: 0.55 },
            colors: ['#ff6b6b', '#ffd93d', '#7ee3b8'],
        });
    }, []);

    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-badge">✨</div>
                <h2 className="modal-title">Congratulations!</h2>
                <p className="modal-sub">You just won</p>
                <div className="prize-text">{prize}</div>

                <div className="modal-actions">
                    <button className="btn-claim" onClick={onClaim}>Claim Prize</button>
                    <button className="btn-close" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
