import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaCheckCircle } from 'react-icons/fa';  
import Card from '../components/Card';  
import FormField from '../components/FormField';  
import Button from '../components/Button';  
import CustomDropdown from '../components/CustomDropdown';  
import WideButton from '../components/WideButton'; 
import { auth, db } from '../firebase';  
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState('');  
  const [selectedDuration, setSelectedDuration] = useState(''); 
  const [tasks, setTasks] = useState([]);  
  const [user, setUser] = useState(null); 

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTasks(currentUser.uid);
      } else {
        setUser(null);
        setTasks([]); 
      }
    });

    return () => unsubscribe();
  }, []);

  
  const fetchTasks = async (userId) => {
    try {
      const q = query(collection(db, 'tasks'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  
  const handleAddTask = async () => {
    if (task.trim() !== '' && user) {  
      const taskWithTime = selectedDuration ? `${task} - ${selectedDuration}` : task;  
      try {
        const docRef = await addDoc(collection(db, 'tasks'), {
          text: taskWithTime,
          completed: false,
          userId: user.uid
        });
        setTasks([...tasks, { id: docRef.id, text: taskWithTime, completed: false }]);  // Add new task to the list
        setTask('');  
        setSelectedDuration('');  
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  
  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

// Handle marking a task as completed
  const handleCompleteTask = async (id, completed) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { completed: !completed });
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="dashboard-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', backgroundColor: '#212121', color: 'white', paddingTop: '1rem' }}>
      
      <Card>
        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Practice Schedule</h2> {/* Centered title */}
        
       
        <FormField 
          type="text" 
          value={task}
          onChange={(e) => setTask(e.target.value)}  
          placeholder="e.g. Pentatonic Scale in A Minor"  
          className='mb-4'
        />

       
        <CustomDropdown 
          options={[
            { label: 'Select Duration (Optional)', value: '' },
            { label: '5 minutes', value: '5 minutes' },
            { label: '10 minutes', value: '10 minutes' },
            { label: '15 minutes', value: '15 minutes' },
            { label: '20 minutes', value: '20 minutes' },
            { label: '30 minutes', value: '30 minutes' },
            { label: '45 minutes', value: '45 minutes' },
            { label: '60 minutes', value: '60 minutes' },
          ]}
          selectedValue={selectedDuration}
          onChange={setSelectedDuration}  
        />

        
        <WideButton onClick={handleAddTask}>
          Add Task
        </WideButton>
      </Card>

     
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', width: '100%', maxWidth: '800px' }}>
        <Button onClick={() => navigate('/chords')}>Chords</Button>
        <Button onClick={() => navigate('/metronome')}>Metronome</Button>
        <Button onClick={() => navigate('/scales')}>Scales</Button>
      </div>

     
      {tasks.length > 0 && (
        <Card
          className="mt-6 scrollable-task-list"
          style={{ 
            width: '100%', 
            maxHeight: '300px',  
            margin: '0 auto', 
            padding: '1.5rem', 
            backgroundColor: '#1e1e1e', 
            border: '1px solid #cccccc50', 
            borderRadius: '8px', 
            overflowY: 'auto'  
          }}
        >
          <div style={{ paddingBottom: '1rem' }}>
            {tasks.map((taskItem, index) => (
              <div key={taskItem.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginBottom: '0.5rem' }}>
                <FormField
                  type="text"
                  value={taskItem.text}
                  readOnly 
                  className={`flex-1 ${taskItem.completed ? 'line-through text-gray-500' : ''}`}  
                />
               
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'absolute', right: '0.5rem' }}>
                  <FaCheckCircle
                    onClick={() => handleCompleteTask(taskItem.id, taskItem.completed)}
                    style={{ cursor: 'pointer', color: taskItem.completed ? 'green' : 'gray' }}
                    size={20}
                  />
                  <FaTrashAlt
                    onClick={() => handleDeleteTask(taskItem.id)}
                    style={{ cursor: 'pointer', color: 'white' }}
                    size={20}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
