import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CSRFToken = () => {

    const [csrftoken, setCsrfToken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`http://127.0.0.1:8000/csrf_token`);
            } catch (err) {

            }
        };

        fetchData();
        setCsrfToken(getCookie('csrftoken'));
    }, []);


    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );

    };

    export default CSRFToken;
