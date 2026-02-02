import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable,  } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Item {
  id: string;
  name: string;
  done?: boolean;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("")
  const [donem, setDone] = useState(false);


  const addItem = () => {
    if (input.trim()) {
      setItems(prev => [
        ...prev,
        { id: Date.now().toString(), name: input.trim(), done: false},
      ]);
      setInput("")
      AsyncStorage.setItem("", input);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={{padding: 30, fontSize: 30}}>TODO list</Text>
      <View style={{flexDirection: "row"}}> <TextInput value={input} onChangeText={setInput} placeholder='Enter task'/> <Button title="Save" onPress={addItem} /> </View>
      
      <SwipeListView style={{padding:20}} data={items} keyExtractor={item => item.id} renderItem={({item}) => (
        <View>
          <Pressable onPress={() => {
            item.done = !item.done
            setDone(!donem)
          }}>
            <Text style={{textDecorationLine: item.done ? "line-through" : "none", padding: 10}}>{item.name}</Text>
          </Pressable>
        </View>
        
      )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
