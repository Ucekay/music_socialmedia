import React, { useState } from "react";
import { Heart, HeartSolid } from "iconoir-react-native";

const HeartIcon = (props: any): JSX.Element => {
  const [color, setColor] = useState<string>('#000000');
  const [status, setStatus] = useState(false)
  //読み込み時にdetabase参照して管理する
  const HandleClick = () => {
    if (status == false) {
        setColor('#D93A49')
        setStatus(true)
    } else if (status == true) {
        setColor('#000000')
        setStatus(false)
    }
  }
  return (
    <>
    {status==false ? (
    <Heart color={color} onPress={HandleClick} style={[{color: color}, props.style]} width={props.size} height={props.size} />
    ):(
    <HeartSolid  color={color} onPress={HandleClick} style={[{color: color}, props.style]} width={props.size} height={props.size}/>
    )}
    </>

  )
}

export default HeartIcon;
