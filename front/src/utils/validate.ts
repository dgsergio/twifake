export function validateSignin(name: string, pass: string): string[] {
  const messages = [];
  if (name.trim().length === 0) messages.push('username is mandatory');
  else if (name.trim().length > 24) messages.push('username is too long');
  else if (name.trim().length < 3) messages.push('username is too short');
  if (pass.trim().length === 0) messages.push('password is mandatory');
  else if (pass.trim().length < 6) messages.push('password too short');
  return messages;
}

export function validateSignup(
  name: string,
  pass: string,
  pass2: string,
  email: string,
  profileUrl: string
): string[] {
  const messages = [];

  if (name.trim().length === 0) messages.push('username is mandatory');
  else if (name.trim().length > 24) messages.push('username is too long');
  else if (name.trim().length < 3) messages.push('username is too short');
  if (pass.trim().length === 0) messages.push('password is mandatory');
  else if (pass.trim().length < 6) messages.push('password too short');
  else if (pass !== pass2) messages.push('passwords do not match');

  const regexUrl = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  const regexEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );

  if (email.trim().length === 0 && !regexEmail.test(email))
    messages.push('invalid email');
  if (profileUrl.trim().length !== 0 && !regexUrl.test(profileUrl))
    messages.push('invalid URL');

  return messages;
}
