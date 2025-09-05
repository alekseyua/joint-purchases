
import { useEffect, useState } from 'react'
import Support from './Support'
import type { ISupport } from '~/types/types';
import axios from 'axios';

type Props = {}

const SupportContainer = (props: Props) => {
  const [supports, setSupports] = useState<ISupport[]>([]);
    // const fakeSupports: ISupport[] = [
    //   {
    //     title: "Стас",
    //     description: "По всем вопросам",
    //     avatar: icons.avatar,
    //     buttons: [
    //       {
    //         name: "Написать",
    //         href: "http://t.me/admrazb",
    //         action: "link",
    //         style: "telegram-blue-full",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Стас",
    //     description: "Оплата товаров",
    //     avatar: icons.avatar,
    //     buttons: [
    //       {
    //         name: "Написать",
    //         action: "link",
    //         href: "http://t.me/admrazb",
    //         style: "telegram-blue-full",
    //       },
    //     ],
    //   },
    // ];
    useEffect(()=>{
      const getFetchData = async function () {
        try {
          const url = "https://botrazbor.ru/lk/api_get_support/";
          const res: { data: ISupport[]; status : number} = await axios.get(url);
          if(res.status === 200){
            setSupports(res.data);
          }else{
            const err = new Error('catch error request ' + url)
            console.log(err)
          }
          
        } catch (error) {
            console.log((error as Error).message);
        }
      };
      getFetchData();
    },[])
    
  return <Support listSupports={supports} />;
}

export default SupportContainer