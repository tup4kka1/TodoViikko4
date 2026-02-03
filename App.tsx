import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
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
  const KEYS = "todoitems";

  const addItem = () => {
    if (input.trim()) {
      //setItems(prev => [
       // ...prev,
        //{ id: Date.now().toString(), name: input.trim(), done: false},
      //]);
      const list = [...items, { id: Date.now().toString(), name: input.trim(), done: false}];
      SAVE(list);
      setItems(list);
      setInput("")
    }
  }

  const SAVE = async (list: Item[]) => {
    await AsyncStorage.setItem(KEYS, JSON.stringify(list));
  };

  useEffect(() => {
    LOAD();
  }, []);

  const LOAD = async () => {
    const data = await AsyncStorage.getItem(KEYS);
    if (data) {
      setItems(JSON.parse(data));
    }
  };

  const TOGGLE = (id: string) => {
    const list = items.map(i => i.id === id ? { ...i, done: !i.done } : i);
    setItems(list);
    SAVE(list);
  };


  return (
    <View style={styles.container}>
      <Text style={{padding: 30, fontSize: 30}}>TODO list</Text>
      <View style={{flexDirection: "row", paddingHorizontal: 20}}> <TextInput style={{flex: 1, padding: 10}} value={input} onChangeText={setInput} placeholder='Enter task'/> <Button title="Save" onPress={addItem} /> </View>
      
      <SwipeListView style={{padding:20}} data={items} keyExtractor={item => item.id} renderItem={({item}) => (
        <View>
          <Pressable onPress={() => {
            //item.done = !item.done
            TOGGLE(item.id)
          }}>
            <Text style={{textDecorationLine: item.done ? "line-through" : "none", padding: 10, textAlign: "left"}}>{item.name}</Text>
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
    //alignItems: 'center',
    justifyContent: 'center',
  },
});
