import {useState} from 'react';
import {useUser} from '../context/UserProvider';
import {getShoppingCart} from '../service/Request';

const useShoopService = () => {
  const {userData} = useUser();

  const [names, setNames] = useState([]);
  const [costs, setCosts] = useState([]);
  const [ids, setIds] = useState([]);

  const processShoppingCart = async () => {
    try {
      if (!userData) {
        console.error('User data is not available');
        return;
      }

      const {username, hash} = userData;
      if (!username || !hash) {
        console.error('Username or hash is not available');
        return;
      }

      const response = await getShoppingCart(username, hash);
      if (response) {
        const {aisles, cost, id} = response;
        const nameList = aisles.flatMap(aisle =>
          aisle.items.map(item => item.name),
        );
        const idList = aisles.flatMap(aisle =>
          aisle.items.map(item => item.id),
        );
        const costList = aisles.flatMap(aisle =>
          aisle.items.map(item => item.cost),
        );

        setNames(nameList);
        setIds(idList);
        setCosts(costList);
      }
    } catch (error) {
      console.error('ErrorReq:', error);
    }
  };

  return {
    names,
    costs,
    ids,
    processShoppingCart,
  };
};

export default useShoopService;
