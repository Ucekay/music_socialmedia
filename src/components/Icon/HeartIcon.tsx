import React, { useState } from "react";
import IconAntDesign from "./AntDesign";

const HeartIcon = (props: any): JSX.Element => {
  const [color, setColor] = useState<string>('#000000');
  const [name, setName] = useState<string>('hearto');
  const [status, setStatus] = useState<boolean>(false)
  //読み込み時にdetabase参照して管理する
  const HandleClick = () => {
    if (status == false) {
        setColor('#D93A49')
        setName('heart')
        setStatus(true)
    } else if (status == true) {
        setColor('#000000')
        setName('hearto')
        setStatus(false)
    }
  }
  return (
    <IconAntDesign onPress={HandleClick} name={name} style={[{color: color}, props.style]} size={props.size}/>
  )
}

export default HeartIcon;
