import React, {useState} from 'react'
import { Container, Button, Paper, Grid, Typography, Avatar  } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import useStyles from './styles'
import Input from './Input'
import {GoogleLogin, googleLogout} from '@react-oauth/google'
import Icon from './icon'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {signin, signup} from '../../actions/auth'
import jwtDecode from 'jwt-decode'



const initialState = { firstName:'', lastName:'', email:'', password: '', confirmPassword:'' }

const Auth = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isSignUp, setIsSignUp] = useState(false)  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignUp) {
      dispatch(signup(formData, navigate))
      console.log(formData)
    } else {

      dispatch(signin(formData, navigate))
    }
  }
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    setShowPassword(false)
  }
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const googleSuccess = async (res) => {
    // console.log(res)
    
    const decoded = jwtDecode(res.credential)
    console.log('zzzzzzz',decoded)
    const token = decoded?.jti
    const name = decoded?.name
    const _id = decoded?.sub
    const email = decoded?.email
    const imageUrl = decoded?.picture

    const result = {token, name, _id, email, imageUrl}

    try {
      dispatch({ type: 'AUTH', data: {result, token} })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (error) => {
    console.log('iyi gitmedi')
    console.log(error)
  }

  
  return (
    <Container component='main' maxWidth='xs' >
      <Paper className={classes.paper} elevation={3} >
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'  >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2} >
            { isSignUp && (
              <>
              <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
              <Input name='lastName' label='Last Name' handleChange={handleChange}  half />
              </>
            ) }
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}  />
            { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }

          </Grid>
          
          <Button fullWidth type='submit' variant='contained' className={classes.submit} color='primary'  >
              {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            
          />
          <Grid container justifyContent='flex-end' >
            <Grid item >
              <Button onClick={switchMode} >
                {isSignUp ? 'Already have an account ? Sign In' : "don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth