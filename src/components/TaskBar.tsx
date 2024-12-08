import React from 'react';
import { useNavigate} from 'react-router-dom';
import './TaskBar.css';


const TaskBar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="task-bar">
            <button className="task-bar-button" onClick={()=> navigate('/homepage')}>
                Homepage
            </button>
            <button className="task-bar-button" onClick={()=>navigate('/calendar')}>
                Calendar
            </button>
            <button className="task-bar-button" onClick={()=>navigate('/Wardrobe')}>
                Wardrobe
            </button>
            <button className="task-bar-button" onClick={()=>navigate('/WeatherPage')}>
                Weather
            </button>
        </div>
    )
}
export default TaskBar;
