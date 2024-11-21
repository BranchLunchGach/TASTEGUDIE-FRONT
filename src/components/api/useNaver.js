import { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

function reducer(state, action) {
    switch(action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            return state;
    }
}

function useNaver(search) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null,
    });

    const fetchData = useCallback(async () => {
        if (!search.trim()) {
            dispatch({ type: 'SUCCESS', data: [] }); // 빈 검색어 처리
            return;
        }

        console.log(search);

        try {
            dispatch({ type: 'LOADING' });
            const { data: { items } } = await axios.get(
                '/v1/search/local.json',
                {
                    params: {
                        query: search,
                        display: 3,
                    },
                    headers: {
                        'X-Naver-Client-Id': process.env.REACT_APP_NAVER_ID,
                        'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_SECRET,
                    },
                }
            );
            dispatch({ type: 'SUCCESS', data: items });
        } catch (err) {
            dispatch({ type: 'ERROR', error: err });
        }
    }, [search]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return state;
}

export default useNaver;