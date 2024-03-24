import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../UI/Spinner';
import classes from './UpdateProfile.module.css';
import { AppDispatch, RootState } from '../../store';
import { UpdateReq, updateApi } from '../../store/usersSlice';

type Props = {
  onSetShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  displayName: string;
};

function UpdateProfile({ onSetShowEdit, displayName }: Props) {
  const { loadingStatus } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();

  const cancelHandler = () => {
    onSetShowEdit(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const req: UpdateReq = {
      url: import.meta.env.VITE_URL + '/update/user',
      body: { displayName: target.display.value },
    };
    dispatch(updateApi(req));
    onSetShowEdit(false);
    window.location.href = window.location.href;
  };

  return (
    <div className={classes['form-wrapper']}>
      <form onSubmit={submitHandler} className={classes.form}>
        <input type="text" name="display" defaultValue={displayName} />
        <div className={classes['form-btns']}>
          <button type="submit">Update</button>
          <button
            type="button"
            className={classes.cancel}
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
      {loadingStatus.loading && <Spinner className={classes.spinner} />}
    </div>
  );
}

export default UpdateProfile;
