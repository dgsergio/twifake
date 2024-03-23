import classes from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPosts } from '../store/postsSlice';
import HeaderProfile from '../components/profile/HeaderProfile';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainNav from '../components/UI/MainNav';
import { Item } from '../components/MainHeader';
import Posts from '../components/Posts';
import Navegation from '../components/UI/Navegation';
import UserOptionModal from '../components/UserOptionModal';
import { UpdateReq, updateApi } from '../store/usersSlice';

function Profile() {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showOpt, setShowOpt] = useState<boolean>(false);

  const { users, loggedUser } = useSelector((state: RootState) => state.users);
  const { posts } = useSelector((state: RootState) => state.posts);
  const { userName } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const selectedUser = users.find((user) => user.name === userName);
  const postsSelected = posts.filter(
    (post) => post.createdBy === selectedUser?._id
  );

  useEffect(() => {
    dispatch(getPosts('http://localhost:3000/api/v1/posts'));
  }, []);

  const isCurrentUser = selectedUser
    ? loggedUser._id === selectedUser._id
    : false;

  const [selectedDisplayName, setSelectedDisplayName] = useState<string>(
    selectedUser
      ? selectedUser.displayName![0].toUpperCase() +
          selectedUser.displayName!.slice(1)
      : 'Profile'
  );

  const items: Item[] = [{ name: 'Posts', link: '#', isActive: true }];

  const cancelHandler = () => {
    setShowEdit(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const req: UpdateReq = {
      url: 'http://localhost:3000/api/v1/update/user',
      body: { displayName: target.display.value },
    };
    dispatch(updateApi(req));
    setShowEdit(false);
    setSelectedDisplayName(req.body.displayName);
  };

  return (
    <>
      <HeaderProfile
        userName={selectedDisplayName}
        nPost={postsSelected.length}
      />
      <div className={classes.content}>
        <div className={classes.banner}>
          <img src={selectedUser?.profileUrl} alt="profile banner" />
        </div>
        <div className={classes.body}>
          <div className={classes.row}>
            <div className={classes.profile}>
              <img src={selectedUser?.profileUrl} alt="profile image" />
            </div>
            {isCurrentUser && (
              <div className={classes['btn-opt']}>
                {showOpt && (
                  <UserOptionModal
                    onSetShowOpt={setShowOpt}
                    onSetShowEdit={setShowEdit}
                  />
                )}
                <button onClick={() => setShowOpt(true)}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </div>
            )}
          </div>
          <div className={classes.column}>
            {showEdit ? (
              <form onSubmit={submitHandler} className={classes.form}>
                <input
                  type="text"
                  name="display"
                  defaultValue={selectedDisplayName}
                />
                <div>
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
            ) : (
              <h3>{selectedDisplayName}</h3>
            )}
            {selectedUser && isCurrentUser && <p>{selectedUser.email}</p>}
            {selectedUser && <p>@{selectedUser.name}</p>}
          </div>
        </div>
        <MainNav className={classes['nav-Posts']}>
          {items.map((item) => (
            <Navegation item={item} key={item.name} />
          ))}
        </MainNav>
        <Posts posts={postsSelected} />
      </div>
    </>
  );
}

export default Profile;
