import React from "react";
import { StyledFooter } from "./styles/styleFooter.style";
export default function Footer({ contents, setContents }) {
  const itemReplacer = (array, oldItem, newItem) => {
    var done = false;
    return array.map((item) => {
      if (item === oldItem && !done) {
        done = true;
        return newItem;
      } else {
        if (item === newItem) {
          return oldItem;
        } else {
          return item;
        }
      }
    });
  };

  const handleChangeFeauture = (item) => {
    let changedContents = [...contents];
    changedContents = itemReplacer(changedContents, contents[0], item);
    setContents(changedContents);
  };
  return (
    <StyledFooter>
      {contents.map((items, index) => {
        if (index !== 0)
          return (
            <div key={index} onClick={(e) => handleChangeFeauture(items)}>
              {items}
            </div>
          );
      })}
    </StyledFooter>
  );
}
