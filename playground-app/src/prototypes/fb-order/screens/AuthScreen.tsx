/**
 * Auth Screen: send a code, then enter it to verify the guest can add to tab and order.
 * Mock flow — no real SMS; any 4–6 digit code accepts for demo.
 */

import { useState } from 'react';
import { WireButton, WireCard } from '../../../components/lo-fi';

export interface AuthScreenProps {
  onVerified: () => void;
}

const CODE_LENGTH = 6;

export function AuthScreen({ onVerified }: AuthScreenProps) {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = () => {
    setStep('verify');
    setError(null);
    setCode('');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = code.replace(/\s/g, '');
    if (trimmed.length < 4 || trimmed.length > 8) {
      setError('Enter the 4–8 digit code we sent you.');
      return;
    }
    onVerified();
  };

  if (step === 'request') {
    return (
      <div className="fb-order__screen fb-order__auth">
        <div className="fb-order__auth-hero">
          <h1 className="fb-order__auth-title">Verify you can order</h1>
          <p className="fb-order__auth-sub">
            We’ll send a code to your phone so you can add orders to your tab. No payment now.
          </p>
        </div>

        <WireCard variant="solid" className="wire-card--item fb-order__auth-card">
          <p className="fb-order__auth-body">
            When you tap “Send code”, we’ll send a one-time code by SMS. Enter it on the next screen to continue.
          </p>
        </WireCard>

        <div className="fb-order__auth-actions">
          <WireButton type="button" primary className="fb-order__btn-block" onClick={handleSendCode}>
            Send code
          </WireButton>
        </div>
      </div>
    );
  }

  return (
    <div className="fb-order__screen fb-order__auth">
      <div className="fb-order__auth-hero">
        <h1 className="fb-order__auth-title">Enter your code</h1>
        <p className="fb-order__auth-sub">
          Enter the {CODE_LENGTH}-digit code we sent to your phone.
        </p>
      </div>

      <form onSubmit={handleVerify} className="fb-order__auth-form">
        <WireCard variant="solid" className="wire-card--item fb-order__auth-card">
          <label htmlFor="fb-order-auth-code" className="fb-order__auth-label">
            Verification code
          </label>
          <input
            id="fb-order-auth-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={8}
            placeholder="000000"
            className="wire-input fb-order__auth-input"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, 8));
              setError(null);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? 'fb-order-auth-error' : undefined}
          />
          {error && (
            <p id="fb-order-auth-error" className="fb-order__auth-error" role="alert">
              {error}
            </p>
          )}
        </WireCard>

        <div className="fb-order__auth-actions">
          <WireButton type="submit" primary className="fb-order__btn-block">
            Verify and continue
          </WireButton>
        </div>
      </form>
    </div>
  );
}
