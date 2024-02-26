import React from 'react';
import { banGaming, banPhimGaming, chuotGaming, gheGaming, loaIcon, lotChuot, moHinh, phuKien, taiNghe, tayCamGaming } from '../../Components/Export/ExportVarible';

const useRenderListBrand = (category, setListBrand , setCategoryLabel) => {
        switch (category) {
          case "lot-chuot":
            setListBrand(lotChuot);
            setCategoryLabel(lotChuot[0].category);
            break;
          case "chuot-gaming":
            setListBrand(chuotGaming);
            setCategoryLabel(chuotGaming[0].category);
            break;
          case "ban-phim-gaming":
            setListBrand(banPhimGaming);
            setCategoryLabel(banPhimGaming[0].category);
            break;
          case "tai-nghe":
            setListBrand(taiNghe);
            setCategoryLabel(taiNghe[0].category);
            break;
          case "tay-cam-gaming":
            setListBrand(tayCamGaming);
            setCategoryLabel(tayCamGaming[0].category);
            break;
          case "loa":
            setListBrand(loaIcon);
            setCategoryLabel(loaIcon[0].category);
            break;
          case "mo-hinh":
            setListBrand(moHinh);
            setCategoryLabel(moHinh[0].category);
            break;
          case "phu-kien":
            setListBrand(phuKien);
            setCategoryLabel(phuKien[0].category);
            break;
          case "ghe-gaming":
            setListBrand(gheGaming);
            setCategoryLabel(gheGaming[0].category);
            break;
          case "ban-gaming":
            setListBrand(banGaming);
            setCategoryLabel(banGaming[0].category);
            break;
        }
      };


export default useRenderListBrand;