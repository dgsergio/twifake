import classes from './SignModal.module.css';
import { useNavigate } from 'react-router-dom';
import { validate } from '../utils/validate';
import { useEffect, useState } from 'react';
import Modal from './UI/Modal';

function SignupModal({
  onSetShowSignup,
}: {
  onSetShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [errorMsg]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { username, password, password2, email } =
      e.target as typeof e.target & {
        username: { value: string };
        password: { value: string };
        password2: { value: string };
        email: { value: string };
      };
    console.log(username.value, password.value, password2.value, email.value);
    // validate
  };

  return (
    <>
      <Modal onShowModal={onSetShowSignup} showIcon={true}>
        <div className={classes.body}>
          <h2>Create your account</h2>
          <form className={classes.form} onSubmit={submitHandler}>
            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="password" />
            <input
              type="password"
              name="password2"
              placeholder="repeat password"
            />
            <button>Sign up</button>
          </form>
        </div>
      </Modal>
      {errorMsg && (
        <div className="message error">
          <p>We could not access your account.</p>
        </div>
      )}
    </>
  );
}

export default SignupModal;
