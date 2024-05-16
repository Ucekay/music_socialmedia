import React, { useState } from "react";
import IconA from "./AntDesign";

const HeartIcon = (props: any): JSX.Element => {
  const [color, setColor] = useState<string>('#000000');
  const [name, setName] = useState<string>('hearto')
  const HandleClick = () => {
    if (color == '#000000') {
        setColor('#D93A49')
        setName('heart')
    } else if (color == '#D93A49') {
        setColor('#000000')
        setName('hearto')
    }
  }
  return (
    <IconA onPress={HandleClick} name={name} style={[{color: color}, props.style]} size={props.size}/>
  )
}

export default HeartIcon;
