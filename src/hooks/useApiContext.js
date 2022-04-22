import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext.jsx';

const useApi = () => useContext(ApiContext);

export default useApi;
