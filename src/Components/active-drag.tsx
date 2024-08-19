// Radix
import { Switch, Badge } from "@radix-ui/themes"

export const ActiveDrag = ({ checkedValue, updateCheckedValue }:{checkedValue:boolean, updateCheckedValue: () => void}) => {

    // switchProps
    const switchProps = {
        defaultChecked: !checkedValue
    }

    return(
        <div className="flex items-center">
            <Switch size="1" {...switchProps} onClick={updateCheckedValue}/>
            <p>Dragging: <Badge color={!checkedValue ? 'green' : 'red'}>{!checkedValue ? 'On' : 'Off'}</Badge></p>
        </div>
    )
}