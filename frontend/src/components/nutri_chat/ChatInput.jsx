import React from 'react';
import './ChatInput.css';

const ChatInput = ({ value, onChange, onKeyDown, placeholder }) => {
  return (
    <div className="InputContainer">
      <input
        placeholder={placeholder}
        id="input"
        className="input"
        name="text"
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default ChatInput;