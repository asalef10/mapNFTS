import 'leaflet/dist/leaflet.css';
import 'antd/dist/antd.css';
import { Badge } from 'antd';

const BadgeR = ({message}) => {
  return (
    <>
    <p style={{textAlign:"center",color:"red",fontSize:"114%" }}>{message}</p>
      <div id="showColor">
        <Badge.Ribbon text="Places that others have purchased" color="red">
          -
        </Badge.Ribbon>
        <Badge.Ribbon text="Those places you purchased" color="blue">
          -
        </Badge.Ribbon>
        <Badge.Ribbon text="Purchase options" color="#FD8D3C">
          -
        </Badge.Ribbon>
      </div>
    </>
  );
};

export default BadgeR