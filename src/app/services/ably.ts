import Ably from 'ably';

let ably: Ably.Realtime | null = null;

export const getAblyClient = () => {
  if (!ably) {
    ably = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY || '',
    });
  }
  return ably;
};
