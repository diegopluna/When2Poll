import React from 'react'

const LoginPage = () => {
  return (
    <div>
        <form>
            <input type="email" name="email" placeholder="Enter email" />
            <input type="password" name="password" placeholder="Enter Password" />
            <input type="submit" />
        </form>
    </div>
  )
}

export default LoginPage