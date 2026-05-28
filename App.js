import React, {useEffect, useState} from "react";
import{
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

const API_URL = "http://192.168.0.142:8000/api/students";

export default function App() {
  const [students, setStudents ] = useState([]);

  const [id, setId ] = useState(null);
  const [name, setName ] = useState("");
  const [email, setEmail ] = useState("");
  const [age, setAge ] = useState("");

  const getStudents = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    getStudents();
  },[]);

  const saveStudent = async () => {
    if (name === "" || email === "" || age === ""){
      alert("Ploteso te gjitha fushat");
      return;
    }

    const method = id === null ? "POST" : "PUT";
    const url = id === null ? API_URL: `${API_URL}/${id}`;

    const response = await fetch(url, {
      method: method,
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        name :name,
        email: email,
        age:age,
      }),
    });

    const result = await response.json();

    alert("Studenti u shtua me sukses");

    setId(null);
    setName("");
    setEmail("");
    setAge("");

    getStudents();
  };

  const editStudent =(student) => {
    setId(student.id);
    setName(student.name);
    setEmail(student.email);
    setAge(String(student.age));
  };

  const deleteStudent = async (studentId) => {
    const response = await fetch(`${API_URL}/${studentId}`,{
      method: "DELETE",
    });

    const result = await response.json();

    alert("Studenti u fshi me sukses");

    getStudents();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student App</Text>

      <TextInput
        style={styles.input}
        placeholder="Emri"
        value = {name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value = {email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mosha"
        value = {age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Button
        title={id === null ? "Shto Student" : "Update Student"}
        onPress={saveStudent}
      />

      <FlatList
        data = {students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item})=>(
          <View style={styles.card}>
            <Text style={styles.text}>Emri: {item.name}</Text>
            <Text style={styles.text}>Email: {item.email}</Text>
            <Text style={styles.text}>Mosha: {item.age}</Text>

            <View style={styles.buttonSpace}>
              <Button title="Edito" onPress={() => editStudent(item)}/>
            </View>

            <View style={styles.buttonSpace}>
              <Button title="Fshij" onPress={() => deleteStudent(item.id)}/>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 1,
  },

  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 18,
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 15,

    borderWidth: 1,
    borderColor: '#E2E8F0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 15,

    elevation: 6,
  },

  text: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 24,
    fontWeight: '500',
  },

  buttonSpace: {
    marginTop: 12,
    borderRadius: 14,
    overflow: 'hidden',
  },

  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  editButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  listContainer: {
    paddingBottom: 30,
  },

  emptyText: {
    color: '#CBD5E1',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
