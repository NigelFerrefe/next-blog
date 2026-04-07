export interface VerifyOTPLoginProps {
  email: string;
  otp: string;
}

export async function verifyOTPLogin(props: VerifyOTPLoginProps) {
  const res = await fetch('/api/auth/verify_otp_login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: props.email, otp: props.otp }),
  });

  const data = await res.json();
  return { status: res.status, data };
}