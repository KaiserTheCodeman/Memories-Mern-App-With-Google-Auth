import React, {useEffect, useState} from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from  './styles'
import memories from '../../images/memories.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import decode from 'jwt-decode'




const Navbar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const classes = useStyles()

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        navigate('/')
        setUser(null)

    }

    useEffect(() => {
        const token = user?.token
        if(token) {
           const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

  return (
    <AppBar className={classes.appBar}  color='inherit' position='static' >
        <div className={classes.brandContainer} >
            <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'  >
                Memories
            </Typography>
            <img className={classes.image} src={memories} alt="memories" height='60' />
        </div>
        <Toolbar className={classes.toolbar} >
            {user ? (
                <div className={classes.profile} >
                    <Avatar className={classes.purple} alt="avatar" src={user.result?.imageUrl ? user.result?.imageUrl : user.result?.picture}  >
                        {user.result?.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant='h6'  >
                        {user.result?.name}
                    </Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}  >
                        Log Out
                    </Button>
                </div>
            ): (
                <Button component={Link} to='/auth' variant='contained' color='primary' >
                    Sign In
                </Button>
            )}
        </Toolbar>    
        </AppBar>
  )
}

export default Navbar