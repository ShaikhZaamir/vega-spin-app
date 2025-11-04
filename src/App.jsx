import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { v4 as uuidv4 } from 'uuid';
import PrizeModal from './PrizeModal';
import './App.css';
import confetti from 'canvas-confetti';

const data = [
  { option: 'Free Coffee' },
  { option: '₹50 Coupon' },
  { option: '10% Off' },
  { option: 'Buy 1 Get 1 Free' },
  { option: 'Free Earpods' }
];

/* Google Form pre-fill */
const FORM_BASE =
  'https://docs.google.com/forms/d/e/1FAIpQLSdvgd1Ee2Hgrlt3uuJ4P8HwY_v8peSggcsqYHhsogeSz_fVuA/viewform?usp=pp_url';
const UID_ENTRY = 'entry.300989821';
const PRIZE_ENTRY = 'entry.1219197929';

export default function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      // subtle UX: small pre-spin flourish
      setPrizeNumber(Math.floor(Math.random() * data.length));
      setMustSpin(true);
    }
  };

  const handleStop = () => {
    setMustSpin(false);
    // confetti burst — multi-shot colorful
    confetti({
      particleCount: 160,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#ff6b6b', '#ffd93d', '#7ee3b8', '#7bdff2', '#b993ff'],
    });
    setTimeout(() => setShowModal(true), 250); // slight delay so confetti shows before modal
  };

  const prize = data[prizeNumber].option;

  const handleClaim = () => {
    const uid = uuidv4();
    const url =
      `${FORM_BASE}&${UID_ENTRY}=${encodeURIComponent(uid)}` +
      `&${PRIZE_ENTRY}=${encodeURIComponent(prize)}`;
    // redirect
    window.location.href = url;
  };

  return (
    <main className="app">
      <header className="header">
        <h1 className="title">
          🎉 <span className="title-gradient">Spin & Win</span> 🎉
        </h1>
        <p className="subtitle">Tap the button & win exciting prizes! Perfect for college fests & popups.</p>
      </header>

      <div className="wheel-stage" aria-hidden={mustSpin ? 'true' : 'false'}>
        <div className={`wheel-card ${mustSpin ? 'spinning' : ''}`}>

          {/* decorative pointer (visible) */}
          <div className="pointer" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2 L15 9 H9 L12 2 Z" fill="#fff" />
            </svg>
          </div>

          <div className="wheel-wrap">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={[
                '#FFC8DD',
                '#FFAFCC',
                '#BDE0FE',
                '#A2D2FF',
                '#CDB4DB'
              ]}
              textColors={['#333']}
              outerBorderColor="#ffffffcc"
              outerBorderWidth={8}
              innerBorderColor="#ffffffaa"
              innerBorderWidth={6}
              radiusLineColor="#ffffff88"
              radiusLineWidth={2}
              spinDuration={2}
              pointerProps={{ style: { display: 'none' } }}
              onStopSpinning={handleStop}
            />
          </div>
        </div>
      </div>

      <button
        className="spin-btn"
        onClick={handleSpinClick}
        disabled={mustSpin}
        aria-disabled={mustSpin}
      >
        {mustSpin ? 'Spinning…' : 'Tap to Spin'}
      </button>

      {showModal && (
        <PrizeModal
          prize={prize}
          onClaim={handleClaim}
          onClose={() => setShowModal(false)}
        />
      )}

      <footer className="footer">Good luck!! May the odds be tasty 🍀</footer>
    </main>
  );
}
