'use client'
import { showsApi } from '@/API/shows/showApi';
import { ShowCard } from '@/components/Card';
import { ICreateShow, IShow } from '@/types/showsTypes';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Shows() {
  const [open, setOpen] = useState(false);
  const [shows, setShows] = useState<IShow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, reset } = useForm<ICreateShow>({
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
    }
  });

  const loadShows = async () => {
    setIsLoading(true);
    try {
      const fetchedShows = await showsApi.getShows();
      // console.log(fetchedShows);
      setShows(fetchedShows);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    };
  }

  const handleCreateShow = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: ICreateShow) => {
    try {
      await showsApi.createShow(data);
      setOpen(false);
      reset();
      loadShows();
      setError('');  // Reset any previous errors
    } catch (error) {
      console.error(error);
  
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred while creating the show');
      }
    }
  };

  useEffect(
    () => {
      loadShows();
    },
    []
  );

  return (
    <>
      {
        isLoading
          ? (
            <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </div>
          )
          : (<>
             <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100px"
              >
                <Button variant="contained" color="primary" onClick={handleCreateShow}>
                  Create Show
                </Button>
              </Box>
            <div style={{ maxWidth: '1000px', margin: 'auto' }}>
              <Grid container spacing={3}>
                {shows.map((show) => (
                  <Grid item xs={4} key={show.id}>
                    <ShowCard
                      id={show.id}
                      name={show.name}
                      description={show.description}
                      imageUrl={show.imageUrl}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>

            <Dialog open={open} onClose={handleClose}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Create New Show</DialogTitle>
                <DialogContent>
                  <TextField
                    {...register('name')}
                    autoFocus
                    margin="dense"
                    label="Show Title"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    {...register('description')}
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    {...register('imageUrl')}
                    margin="dense"
                    label="Image URL"
                    type="text"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type='submit' color="primary">
                    Create
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </>)
      }
    </>
  );
}
