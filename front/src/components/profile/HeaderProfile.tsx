import classes from './HeaderProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainNav from '../UI/MainNav';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
  userName: string;
  nPost: number;
};

function HeaderProfile({ userName, nPost }: Props) {
  const navigate = useNavigate();
  const { loadingStatus } = useSelector((state: RootState) => state.posts);

  return (
    <MainNav className={classes.content}>
      <button onClick={() => navigate('/')} className={classes.back}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className={classes.info}>
        <span>{userName}</span>
        {userName !== 'Profile' && !loadingStatus.loading && (
          <span className={classes['info-sub']}>{nPost} posts</span>
        )}
      </button>
    </MainNav>
  );
}

export default HeaderProfile;
