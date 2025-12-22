import { useNavigate, useOutletContext } from 'react-router-dom';

function Store() {
    const {userName} = useOutletContext();
    return(
        <div>
            <p>{userName}</p>
        </div>
    )
}

export default Store;