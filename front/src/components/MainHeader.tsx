import classes from './MainHeader.module.css';
import MainNav from './UI/MainNav';
import Navegation from './UI/Navegation';

export type Item = { name: string; link: string; isActive?: boolean };

type Props = {
  items: Item[];
  isActive?: boolean;
};

function MainHeader({ items }: Props) {
  return (
    <MainNav className={classes.header}>
      {items.map((item) => (
        <Navegation item={item} key={item.name} />
      ))}
    </MainNav>
  );
}

export default MainHeader;
