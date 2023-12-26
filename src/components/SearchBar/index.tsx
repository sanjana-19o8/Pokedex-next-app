import { Button, Stack } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (term: string) => any;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const handleKeyChange = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && selectedItem !== searchResults.length - 1) {
      setSelectedItem((prev) => (prev === null ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp' && selectedItem !== 0) {
      setSelectedItem((prev) => (prev === null ? 0 : prev - 1));
    }
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setShow(true)
  };

  const handleSearch = () => {
    const results = onSearch(searchTerm);
    setSearchResults(results);
    setShow(false)
  };

  return (
    <div>
      <Stack className={styles.inputWrapper}>

      <input className={styles.inputText} type="text" value={searchTerm} onChange={(e) => handleInputChange(e.target.value)} placeholder='Select Pokemon' />
      <Button className={styles.searchButton} onClick={handleSearch}>Search</Button>
      </Stack>

      {show && <Stack onKeyDown={handleKeyChange} tabIndex={0}>
        {(searchResults as string[]).map((result, index) => {
          return (
            <li key={result} className={selectedItem === index ? 'selected' : ''}>
              <Link href={`/pokemon/${encodeURIComponent(result)}`}>
                {result}
              </Link>
            </li>
          );
        })}
      </Stack>}
    </div>
  );
};

export default SearchBar;
