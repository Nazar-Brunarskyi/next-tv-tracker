'use client'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { authApi } from '@/API/auth/authApi';
import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  userName: string,
  email: string
  password: string,
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { handleSubmit, register } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const email = data.email;
      const password = data.password;
      const userName = data.userName;

      await authApi.signUp(email, password, userName);

      router.push('/');
    } catch (error) {
      console.error(error);
      
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }

    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5" marginBottom={'20px'}>
              Sign up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register('userName')}
                    required
                    fullWidth
                    id="userName"
                    label="User name"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('email')}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('password')}

                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
              {
                error && (
                  <Typography variant='body2' sx={{color: 'red'}}>
                    {error}
                  </Typography>
                )
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </>
    );
  }
