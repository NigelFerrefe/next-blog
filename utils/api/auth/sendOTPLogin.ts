export interface SendOTPLoginProps {
  email: string;
}

export async function sendOTPLogin(props: SendOTPLoginProps) {
  const res = await fetch('/api/auth/send_otp_login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: props.email }),
  });

  const data = await res.json();
  return { status: res.status, data };
}