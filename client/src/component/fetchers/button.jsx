import 'antd/dist/antd.css';
import { Button } from 'antd';

const myButton = ({nameButton,handleFunction }) => {
  return (
    <>
          <Button onClick={() => { handleFunction() }} type="primary">{nameButton}</Button>
          
    </>
  );
};
export default myButton