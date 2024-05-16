import { Pressable } from "react-native";
import  Icon  from "react-native-vector-icons/AntDesign";

interface Props {
    name: string,
    size: number,
    HandleClick?: any,
    style?: any
}

const IconA = (props: Props): JSX.Element => {
    return(
        <Pressable onPress={props.HandleClick}>
            <Icon 
            name={props.name}
            size={props.size} 
            style={props.style}/>
        </Pressable>
    )
}

export default IconA;