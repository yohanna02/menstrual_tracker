import { MMKV } from "react-native-mmkv";


const storage = new MMKV({
  id: "user",
  encryptionKey: 'hunter2'
});

export default storage;