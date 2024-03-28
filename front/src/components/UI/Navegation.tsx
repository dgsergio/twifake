import classes from './Navegation.module.css';
import { Item } from '../MainHeader';
import ButtonSecondary from './ButtonSecondary';

type Props = {
  item: Item;
  onClick: () => void;
};

function Navegation({ item, onClick }: Props) {
  return (
    <ButtonSecondary className={classes.navegation} onClick={onClick}>
      <span>{item.name}</span>
      {item.isActive && <div className={classes.line}></div>}
    </ButtonSecondary>
  );
}

export default Navegation;
