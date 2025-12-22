import { useState} from 'react';
import axios from 'axios'

import { useNavigate, useOutletContext } from 'react-router-dom';

function Store() {
    const {userName} = useOutletContext();
    return(
        <div class="no-header-content">
            <p>{userName}</p>
        </div>
    );
}

export default Store;