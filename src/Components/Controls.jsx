import AddButton from "./AddButton"
import colors from "../assets/colors.json"
import Colors from "../Components/Colors"

const Controls = () => {
  return (
    <div id="controls">
      <AddButton/>
      {
        colors.map((color) => (
          <Colors key={color.id} color={color}/>
        ))
      }
    </div>
  )
}

export default Controls
