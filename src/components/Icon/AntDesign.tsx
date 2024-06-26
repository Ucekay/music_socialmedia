import { Pressable } from "react-native";
import  Icon  from "react-native-vector-icons/AntDesign";

interface Props {
    name: string,
    size: number,
    onPress?: any,
    style?: any
}

const IconAntDesign = (props: Props): JSX.Element => {
    return(
        <Pressable onPress={props.onPress}>
            <Icon 
            name={props.name}
            size={props.size} 
            style={props.style}/>
        </Pressable>
    )
}

export default IconAntDesign;