import { useCallback } from 'react';
import { User } from '../../services/github';

import "./styles.css";

interface IAutocompleteProps {
    usersList: User[];
    inputValue: string;
}

const Autocomplete = ({ usersList, inputValue }: IAutocompleteProps) => {
    const getHighlightedText = useCallback((text: string) => {
        const startIndex = text.toLowerCase().indexOf(inputValue.toLowerCase());

        return (
            <span>
                {text.substring(0, startIndex)}
                <b>{text.substring(startIndex, startIndex + inputValue.length)}</b>
                {text.substring(startIndex + inputValue.length)}
            </span>
        )
    }, [inputValue])

    return (
        <ul className='c-autocomplete'>
            {usersList.map(user => (
                <li className='c-autocomplete__item' key={user.id}>
                    {getHighlightedText(user.login)}
                </li>
            ))}
        </ul>
    );
}

export default Autocomplete;