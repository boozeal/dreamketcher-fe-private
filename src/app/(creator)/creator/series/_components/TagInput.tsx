'use client';

import { useState } from 'react';

export interface TagInputProps {
  placeholder?: string;
  initialTags?: string[];
  onChange?: (tags: string[]) => void;
  height?: string;
  width?: string;
  active?: boolean;
}

const TagInput: React.FC<TagInputProps> = (props) => {
  const {
    placeholder = '태그를 입력하고 Enter를 누르세요',
    initialTags = [],
    onChange,
    active = false,
    height = 'auto',
    width = '100%',
  } = props;

  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isComposing, setComposing] = useState(false);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length <= 10 && tag.length <= 6) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      onChange?.(updatedTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onChange?.(updatedTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    const value = inputValue.trim();

    if (e.key === 'Enter' && value) {
      addTag(value);
      setInputValue('');
      e.preventDefault();
    }
  };

  return (
    <div
      className={`flex items-center px-2 py-3 border rounded-md text-sm focus:outline-none transition-colors duration-200 ${
        isFocused || active ? 'border-brand-yellow' : 'border-brand-gray'
      }`}
      style={{ height, width }}
    >
      <div className="flex gap-1 flex-wrap">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-1 text-white bg-[#5474CE] border-[#4C68B4] border rounded-[3px] px-[6px] py-[1px] text-[13px]"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="text-white focus:outline-none"
              onClick={() => removeTag(tag)}
            >
              x
            </button>
          </div>
        ))}
      </div>

      {tags.length < 10 && (
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          className={`flex-1 px-2 focus:outline-none ${
            inputValue
              ? 'text-[#3F3F3F]'
              : 'text-[#C9C9C9] placeholder:text-[#C9C9C9]'
          }`}
        />
      )}
    </div>
  );
};

export default TagInput;
