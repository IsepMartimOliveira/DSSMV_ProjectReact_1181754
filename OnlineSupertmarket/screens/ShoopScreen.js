import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useUser} from '../context/UserProvider';
import {getShoppingCart} from '../service/Request';
import TextOutput from '../components/TextOutput';
import Title from '../components/Title';

const ShoppingCartScreen = () => {
  const {userData} = useUser();
  const [names, setNames] = useState([]);
  const [ids, setIds] = useState([]);
  const [costs, setCosts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
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
            const {aisles,cost,id} = response;
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

      fetchData();
    }, [userData]),
  );

  return (
    <View>
      <Title>Shopping Cart Screen</Title>
      <FlatList
        data={names}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TextOutput
            textOutput={`Name: ${names[index]}\nExpected Cost: ${costs[index]}`}
          />
        )}
      />
    </View>
  );
};

export default ShoppingCartScreen;
