import React, { useState } from 'react';

const TimeInput = ({ label, defaultHour, defaultMinute, onChange }) => {
    const [hour, setHour] = React.useState(defaultHour);
    const [minute, setMinute] = React.useState(defaultMinute);
  
    React.useEffect(() => {
      if (onChange) {
        onChange(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }, [hour, minute]);
  
    const handleHourChange = (event) => {
      const value = parseInt(event.target.value);
      if (value >= 0 && value <= 23) {
        setHour(value);
      }
    };
  
    const handleMinuteChange = (event) => {
      const value = parseInt(event.target.value);
      if ([0, 15, 30, 45].includes(value)) {
        setMinute(value);
      }
    };
  
    const incrementMinute = () => {
      setMinute((minute + 15) % 60);
    };
  
    const decrementMinute = () => {
      setMinute((minute + 45) % 60);
    };
  
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div>
            <input
              type="number"
              min="0"
              max="23"
              step="1"
              value={hour.toString().padStart(2, '0')}
              onChange={handleHourChange}
              style={styles.input}
            />
            <button type='button' onClick={() => setHour((hour + 1) % 24)} style={styles.button}>
              ▲
            </button>
            <button type='button' onClick={() => setHour((hour + 23) % 24)} style={styles.button}>
              ▼
            </button>
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="45"
              step="15"
              value={minute.toString().padStart(2, '0')}
              onChange={handleMinuteChange}
              style={styles.input}
            />
            <button type='button' onClick={incrementMinute} style={styles.button}>
              ▲
            </button>
            <button type='button' onClick={decrementMinute} style={styles.button}>
              ▼
            </button>
          </div>
        </div>
      </div>
    );
  };

export default TimeInput

const styles = {
    body: {
      backgroundColor: '#222831'
    },
    login: {
      width: "360px",
      height: "min-content",
      padding: "20px",
      borderRadius: "12px",
      backgroundColor: '#393E46'
    },
    title: {
      fontSize: "36px",
      marginBottom: "25px",
      color:'#EEEEEE'
    },
    form: {
      fontSize: "20px",
    },
    formGroup: {
      marginBottom: "12px",
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    button: {
      backgroundColor: "#00ADB5",
      borderRadius: '5px', 
      margin: '2px'
    },
    remember: {
      color: '#EEEEEE'
    },
    input: {
        borderRadius: '5px',
        padding: '5px',
        width: '50px',
        textAlign: 'center',
        marginRight: '5px',
    }
  }