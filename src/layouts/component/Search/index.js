import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import * as searchService from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import AccountItem from '~/component/AccountItem';
import { SearchIcon } from '~/component/Icons';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const focusInputSearch = useRef();

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    // Nên chú thích
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    // request
    //   .get('users/search', {
    //     params: {
    //       q: debounced,
    //       type: 'less',
    //     },
    //   })
    //   .then((res) => {
    //     setSearchResult(res.data);
    //     console.log(res.data);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });

    const fetchApi = async () => {
      setLoading(true);
      const result = await searchService.search(debounced);
      setSearchResult(result);
      setLoading(false);
    };
    fetchApi();
  }, [debounced]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    focusInputSearch.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
    setLoading(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    // đặt biến để khi kiểm tra điều kiện r mới set lại state
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    <>
      {/* Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. */}
      <div>
        <HeadlessTippy
          interactive
          visible={showResult && searchResult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                {searchResult.map((result) => (
                  <AccountItem key={result.id} data={result} />
                ))}
              </PopperWrapper>
            </div>
          )}
          onClickOutside={handleHideResult}>
          <div className={cx('search')}>
            <input
              ref={focusInputSearch}
              placeholder="Search accounts and videos"
              spellCheck={false}
              value={searchValue}
              onChange={handleChange}
              onFocus={() => setShowResult(true)}
            />
            {!!searchValue && !loading && (
              <button className={cx('clear')} onClick={handleClear}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

            <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault}>
              <SearchIcon />
            </button>
          </div>
        </HeadlessTippy>
      </div>
    </>
  );
}

export default Search;
