
export const decodeJWT = <T>(token: string) => {
  const payload = token.split('.')[1];
  const payloadDecode:T =  JSON.parse(atob(payload));
  return payloadDecode;
}