import {connectUser} from './Request';
import {useUser} from '../context/UserProvider';
import {useNavigation} from '@react-navigation/native';

const useUserService = () => {
  const {setUser} = useUser();
  const navigation = useNavigation();

  const processUser = async (userData) => {
    try {
      const response = await connectUser(userData);
      console.log('Response:', response);
      if (response.status === 'success') {
        setUser(response);
        navigation.navigate('Login');

      } else {
        console.error('API Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {
    processUser,
  };
};

export default useUserService;
