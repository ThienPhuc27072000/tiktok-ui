import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faEarthAsia,
  faKeyboard,
  faEllipsisVertical,
  faUser,
  faCoins,
  faGear,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
// import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import config from '~/config';

import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import Image from '~/component/Image';
import images from '~/assets/images';
import { InboxIcon, MessageIcon, UploadIcon } from '~/component/Icons';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        { type: 'language', code: 'en', title: 'English' },
        { type: 'language', code: 'vi', title: 'Vietnamese' },
      ],
    },
  },
  { icon: <FontAwesomeIcon icon={faCircleQuestion} />, title: 'Feedback and help', to: '/feedback' },
  { icon: <FontAwesomeIcon icon={faKeyboard} />, title: 'Keyboard shortcut' },
];

function Header() {
  const currentUser = true;

  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@hoaa',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('inner')}>
          <Link to={config.routes.home} className={cx('logo-link')}>
            <img src={images.logo} alt="Tiktok" />
          </Link>

          {/* Search */}
          <Search />

          <div className={cx('actions')}>
            {currentUser ? (
              <>
                <Tippy delayed={[0, 200]} content="Upload video" placement="bottom">
                  <button className={cx('action-btn')}>
                    <UploadIcon />
                  </button>
                </Tippy>
                <Tippy delay={[0, 50]} content="Message" placement="bottom">
                  <button className={cx('action-btn')}>
                    <MessageIcon />
                  </button>
                </Tippy>
                <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                  <button className={cx('action-btn')}>
                    <InboxIcon />
                    <span className={cx('badge')}>12</span>
                  </button>
                </Tippy>
              </>
            ) : (
              <>
                <Button text>Upload</Button>
                <Button primary>Login</Button>
              </>
            )}

            <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
              {currentUser ? (
                <Image
                  className={cx('user-avatar')}
                  src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                  alt="Nguyen Van A"
                />
              ) : (
                <button className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
