import { View, Pressable, Text } from 'react-native'
import { Item } from '../types/Item'

interface Props {
  item: Item
  onToggle: (id: string) => void
}

export default function Row({ item, onToggle }: Props) {
  return (
    <View>
      <Pressable onPress={() => onToggle(item.id)}>
        <Text style={{textDecorationLine: item.done ? 'line-through' : 'none', padding: 10, textAlign: 'left',}}>
          {item.name}
        </Text>
      </Pressable>
    </View>
  )
}


        //<View>
         // <Pressable onPress={() => {
            //item.done = !item.done
         //   TOGGLE(item.id)
         // }}>
         //   <Text style={{textDecorationLine: item.done ? "line-through" : "none", padding: 10, textAlign: "left"}}>{item.name}</Text>
        //  </Pressable>
       // </View>