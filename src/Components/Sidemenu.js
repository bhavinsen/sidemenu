import React, { useState } from 'react';
import Arrow from './assets/icon';
import { Data } from '../data';
import Contain from './Contain';
import { AiOutlineAreaChart } from "react-icons/ai";

const Sidemenu = () => {
  const [url, setUrl] = useState('');
  const [attributeData, setAttributeData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [activeItems, setActiveItems] = useState([]);

  const handleOpenURL = (value) => {
    const inputUrl = value?.url;
    setUrl(inputUrl);
    setActiveItems((prevItems) => {
      if (prevItems.includes(value.key)) {
        return prevItems.filter((item) => item !== value.key);
      } else {
        return [...prevItems, value.key];
      }
    });
  };

  const handleParentCheckbox = (parentId) => {
    const allChildChecked = Data.find((item) => item.id === parentId)?.nodes[0]?.nodes?.every(
      (child) => checkedItems[child.id]
    );

    if (allChildChecked) {
      const { [parentId]: _, ...rest } = checkedItems;
      setCheckedItems(rest);
    } else {
      const parentCheckedItems = Data.find((item) => item.id === parentId)?.nodes[0]?.nodes?.reduce(
        (acc, child) => ({ ...acc, [child.id]: true }),
        {}
      );
      setCheckedItems({ ...checkedItems, ...parentCheckedItems, [parentId]: true });
    }
  };

  const handleValues = (data) => {
    if (attributeData.includes(data)) {
      setAttributeData(attributeData.filter((item) => item !== data));
    } else {
      setAttributeData([...attributeData, data]);
    }

    const allChildChecked = Data.find((item) => item.nodes[0]?.nodes?.some((child) => child.id === data))?.nodes[0]?.nodes?.every(
      (child) => checkedItems[child.id]
    );

    const parentId = Data.find((item) => item.nodes[0]?.nodes?.some((child) => child.id === data))?.id;
    if (parentId) {
      if (allChildChecked) {
        handleParentCheckbox(parentId);
      } else {
        const { [parentId]: _, ...rest } = checkedItems;
        setCheckedItems(rest);
      }
    }
  };

  const handleAll = (data, e) => {
    e.stopPropagation(); // Stop event propagation to prevent accordion open/close

    if (checkedItems[data]) {
      const { [data]: _, ...rest } = checkedItems;
      setCheckedItems(rest);
    } else {
      setCheckedItems({ ...checkedItems, [data]: true });
    }

    const allChildChecked = Data.find((item) => item.id === data)?.nodes[0]?.nodes?.every(
      (child) => checkedItems[child.id]
    );

    if (allChildChecked) {
      handleParentCheckbox(data);
    }
  };

  const addData = (newData) => {
    const filteredData = newData?.filter((item) => !attributeData.includes(item));
    setAttributeData([...attributeData, filteredData]);
  };

  return (
    <>
      <div className=''>
        <nav
          id="sidenav-1"
          className="absolute left-0 top-0 z-[1035] h-full w-[300px] overflow-hidden bg-[#070926] shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)]"
        >
          <div className='text-white bg-[#141731] h-[48px] font-semibold flex justify-center pr-9 items-center gap-3'> <AiOutlineAreaChart className='text-[24px]' /> Statistics</div>

          <ul className="relative m-0 flex flex-col ">
            {Data?.map((items, index) => {
              const isChecked = checkedItems[items.id];
              const isActive = activeItems.includes(items.key);

              return (
                <li className={`relative border-b border-[#383b53] bg-[#0d1331] ${isActive ? 'active' : ''}`} onClick={() => handleOpenURL(items)} key={items.key}>
                  <a
                    className="h-12 flex gap-3 cursor-pointer items-center truncate  px-6 py-3 text-base text-white outline-none transition duration-300 ease-linear hover:bg-[#3ca3dc] hover:text-white hover:outline-none"
                  >
                    <input type="checkbox" id="test1" className='relative z-50 opacity-0 cursor-pointer' checked={isChecked} onChange={(e) => {
                      handleAll(items.id, e); // Pass event as an argument
                      const details = items?.nodes[0].nodes?.map((detail) => detail?.id);
                      if (checkedItems[items.id]) {
                        const filteredAttributeData = attributeData.filter((value) =>
                          details.includes(value)
                        );
                        const result = attributeData.filter(
                          (attribute) => !filteredAttributeData.includes(attribute)
                        );
                        setAttributeData(result);
                      } else {
                        addData(details);
                      }
                    }} />

                    <label className='w-full cursor-pointer'>{items.label}</label>
                    <span
                      className={`${isActive ? "rotate-180" : ''} absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300`}
                    >
                      <Arrow />
                    </span>
                  </a>
                  <ul className={`${isActive ? "block" : "hidden"} relative m-0 p-0 list-disc list-style-position: outside`}>
                    {items?.nodes[0]?.test?.map((value, index) => {
                      const isChecked = attributeData?.some((data) => data === value.id);

                      return (
                        <>
                          <li className="relative" key={value.id}>
                            <div className=''>
                              <a
                                className="h-12 flex gap-3 cursor-pointer items-center truncate  px-6 py-3 text-base text-white outline-none transition duration-300 ease-linear hover:bg-[#3ca3dc] hover:text-white hover:outline-none pl-[3.1rem] relative submenu"
                                onClick={(e) => {
                                  e.stopPropagation(); // Stop event propagation to prevent accordion open/close
                                  handleOpenURL(value);
                                }}
                              >
                                <div className='relative'>
                                  <input
                                    type="checkbox"
                                    id={value.id}
                                    className='z-50 opacity-0 cursor-pointer'
                                    value={value.id}
                                    checked={isChecked}
                                    onChange={() => {
                                      handleValues(value?.id);
                                    }}
                                  />
                                  <label className='w-full cursor-pointer' htmlFor={value.id}>{value?.label}</label>
                                </div>
                                {value?.length > 0 ? (
                                  <span className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ">
                                    <Arrow />
                                  </span>
                                ) : null}
                              </a>
                            </div>
                          </li>
                          {value?.child?.map((value, index) => {
                            const isChecked = attributeData?.some((data) => data === value.id);

                            return (
                              <li className="relative petamenu" key={value.id}>
                                <div className=''>
                                  <a
                                    className="h-12 flex gap-3 cursor-pointer items-center truncate  px-6 py-3 text-base text-white outline-none transition duration-300 ease-linear hover:bg-[#3ca3dc] hover:text-white hover:outline-none pl-[4.1rem] relative submenu"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Stop event propagation to prevent accordion open/close
                                      handleOpenURL(value);
                                    }}
                                  >
                                    <div className='relative'>
                                      <input
                                        type="checkbox"
                                        id={value.id}
                                        className='z-50 opacity-0 cursor-pointer'
                                        value={value.id}
                                        checked={isChecked}
                                        onChange={() => {
                                          handleValues(value?.id);
                                        }}
                                      />

                                      <label className='w-full cursor-pointer' htmlFor={value.id}>{value?.label}</label>
                                    </div>
                                    {value?.length > 0 ? (
                                      <span className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ">
                                        <Arrow />
                                      </span>
                                    ) : null}
                                  </a>
                                </div>
                              </li>

                            );
                          })}
                        </>

                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className='pl-[300px] h-screen'>
          <Contain url={url} />
        </div>
      </div>
    </>
  );
};

export default Sidemenu;
