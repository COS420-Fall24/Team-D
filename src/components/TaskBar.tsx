import React from 'react';
import { useNavigate} from 'react-router-dom';
import './TaskBar.css';


const TaskBar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="task-bar">
            <button className="task-bar-button" onClick={()=> navigate('/Homepage')}>
                Homepage
            </button>
            <button className="task-bar-button" onClick={()=>navigate('/Calendar')}>
                Calendar
            </button>
            <button className="task-bar-button" onClick={()=> navigate('/Wardrobe')}>
                Homepage
            </button>
            <button className="task-bar-button" onClick={() => navigate('/WeatherPage')}>
                Weather
            </button>
            <button className="task-bar-button" onClick={() => navigate('/Collections')}>
                Collections
            </button>
        </div>
    )
}
export default TaskBar;
