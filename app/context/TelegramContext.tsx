import React, { createContext, useContext, useEffect, useState } from 'react'

export type TelegramWebApp = {
  ready: () => void;
  initDataUnsafe: {
    user: {
      id: number;
      is_bot: boolean;
      first_name: string; //First name of the user or bot.
      last_name: string; //	Optional. Last name of the user or bot
      username: string; //	Optional. Username of the user or bot.
      language_code: string; //	Optional. IETF language tag of the user's language. Returns in user field only.
      is_premium: boolean; //	Optional. True, if this user is a Telegram Premium user.
      added_to_attachment_menu: boolean; //	Optional. True, if this user added the bot to the attachment menu.
      allows_write_to_pm: boolean; //	Optional. True, if this user allowed the bot to message them.
      photo_url: string; //	Optional. URL of the user’s profile photo. The photo can be in .jpeg or .svg formats.
    };
    chat: {
      id: number;
      type: string;
      title: string;
      username: string;
      photo_url: string;
    };
  };
};

export interface TelegramContextType {
    webApp: TelegramWebApp | undefined;
}

interface IProps {
    children: React.ReactNode;
}
const TelegramContext = createContext<TelegramContextType | undefined>(
  undefined
);

const TelegramProvider: React.FC<IProps> = ({ children }: IProps) => {
    const [webApp, setWebApp] = useState<TelegramWebApp | undefined>(undefined);
    useEffect(()=>{
        if(window !== undefined){
            setWebApp(window.Telegram.WebApp);
        }
    },[])

  return <TelegramContext.Provider value={{webApp}}>{children}</TelegramContext.Provider>;
};

export const useTelegram = () => {
    const context = useContext(TelegramContext);
    if(!context) {
        throw new Error('useTelegram must be use Telegram Provider')
    }
    return context
}

export default TelegramProvider;