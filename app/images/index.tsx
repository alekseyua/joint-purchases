import avatar2 from './icons/avatar2.svg';
import read from './icons/read.svg';
import error from './icons/error.svg';
import unread from './icons/unread.svg';
import avatar from './icons/avatar.svg';
import success from './icons/success.svg';
import aggregate from './icons/aggregate.svg';
import searchBlack from './icons/search-black.svg';
import searchWhite from './icons/search-white.svg';
import telegramWhite from './icons/telegram-white.svg';
import searchBlackGray from './icons/search-black-gray.svg';
import searchWhiteGray from './icons/search-white-gray.svg';

export const icons = {
    read,
    error,
    unread,
    avatar,
    avatar2,
    success,
    aggregate,
    searchBlack,
    searchWhite,
    telegramWhite,
    searchBlackGray,
    searchWhiteGray,
};

export type IconName = keyof typeof icons;