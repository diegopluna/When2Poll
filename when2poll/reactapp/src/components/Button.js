import React from 'react'

const PrimaryButton = ({children}) => {
  return (
    <button type='submit' name='submit' className='btn btn-sucess w-100 font-face-sfregular' style={styles.button}>{children}</button>
  )
}

const styles = {
    button: {
        backgroundColor: "#ff735c",
        color: "#000000",
        border: "1px solid #ff735c",
        borderRadius: "7px"
    }
}

export default PrimaryButton