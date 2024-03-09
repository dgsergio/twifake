export function validate(name: string, pass: string): string {
  let message = 'ok';
  if (name.trim().length < 3) message = 'Username is too short. ';
  if (name.trim().length === 0) message = 'Username is mandatory. ';
  if (pass.trim().length === 0) message += 'Password is mandatory. ';
  return message;
}
