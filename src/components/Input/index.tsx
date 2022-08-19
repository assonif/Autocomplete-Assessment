import { ChangeEvent } from "react";

import "./styles.css";

interface IInputProps {
    inputValue: string;
    handleInputValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

const Input = ({ handleInputValueChange, inputValue, loading }: IInputProps) => {
    return (
        <div className="c-input">
            <input
                className="c-input__field"
                type="text"
                placeholder='GitHub username'
                value={inputValue}
                onChange={handleInputValueChange}
            />
            {loading && <span className="c-input__loader" />}
        </div>
    );
}

export default Input;