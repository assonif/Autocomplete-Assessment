import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { getUsersByLogin, IUsersResponse } from '../../services/github';
import Autocomplete from '../Autocomplete';
import Input from '../Input';
import './styles.css';

const usersResponseInitialState = {
    items: [],
    total_count: null
}

const Searchbar = () => {
    const [inputValue, setInputValue] = useState('');
    const [usersList, setUsersList] = useState<IUsersResponse>(usersResponseInitialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetUsersByLogin = useCallback(async (value: string) => {
        try {
            setLoading(true)

            const usersResponse = await getUsersByLogin(value);

            setUsersList(usersResponse);
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const handleInputValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setError(null)
        setUsersList(({ items }) => ({ total_count: null, items }))
        setInputValue(value)
    }, [])

    useEffect(() => {
        // Check if the user is still typing, after 400ms trigger the API call
        const timer = setTimeout(() => {
            if (inputValue) {
                handleGetUsersByLogin(inputValue)
            } else {
                setUsersList(usersResponseInitialState);
            }
        }, 400)

        return () => clearTimeout(timer)
    }, [inputValue])

    const shouldRenderAutocomplete = useMemo(() => (
        inputValue && usersList && (!loading || usersList.items.length > 0) && !error
    ), [inputValue, loading, usersList, error])

    const shouldRenderPlaceholder = useMemo(() => (
        inputValue &&
        !loading &&
        usersList.items.length === 0 &&
        !error &&
        usersList.total_count === 0
    ), [inputValue, loading, usersList, error])

    return (
        <div className="c-searchbar">
            <Input inputValue={inputValue} handleInputValueChange={handleInputValueChange} loading={loading} />
            {shouldRenderAutocomplete && (
                <Autocomplete usersList={usersList.items} inputValue={inputValue} />
            )}
            {error && !shouldRenderAutocomplete && (
                <p className='c-searchbar__error'>{error}</p>
            )}
            {shouldRenderPlaceholder && (
                <p className="c-searchbar__placeholder">0 results for <b>{inputValue}</b></p>
            )}
        </div>
    );
}

export default Searchbar;