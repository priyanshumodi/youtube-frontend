import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'

import LeftNavMenuItem from "./LeftNavMenuItem"
import {categories} from "../utils/Constant"
import { useSelector, useDispatch } from 'react-redux'
import {addSelectedCategory} from '../../features/hooks/hookSlice'

const LeftNav = () => {
    const dispatch = useDispatch()

    const mobileMenu = useSelector(state => state.hookReducer.mobileMenu)
    const selectCategory = useSelector(state => state.hookReducer.selectCategory)

  const navigate = useNavigate();
  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return dispatch(addSelectedCategory(name));
      case "home":
        return dispatch(addSelectedCategory(name));
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div
    className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 md:translate-x-0 transform transition-all ${mobileMenu ? "translate-x-0" : "translate-x-[-240px]"}`}

    >
        <div className="flex px-5 flex-col">
            {categories.map((item) => {
                return (
                    <React.Fragment key={item.name}>
                        <LeftNavMenuItem
                            text={item.type === "home" ? "Home" : item.name}
                            icon={item.icon}
                            action={() => {
                                clickHandler(item.name, item.type);
                                navigate("/");
                            }}
                            className={`${
                                selectCategory === item.name
                                    ? "bg-white/[0.15]"
                                    : ""
                            }`}
                        />
                        {item.divider && (
                            <hr className="my-5 border-white/[0.2]" />
                        )}
                    </React.Fragment>
                );
            })}
            <hr className="my-5 border-white/[0.2]" />
            <div className="text-white/[0.5] text-[12px]">
                Clone by: Priyanshu Modi
            </div>
        </div>
    </div>
    );
}

export default LeftNav