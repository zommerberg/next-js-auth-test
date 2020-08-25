import React, { useEffect, useState } from 'react'
import axios from 'axios'
function index() {
  const [user, setUser] = useState(null as any)
  const fetchUser = async () => {
    try {
      const user = await axios.get('/me')
      setUser(user.data.user)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return <div>{user != null ? user.email : 'user is null'}</div>
}
export default index
