import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getByCategoryAPI } from '../api';

interface PeopleI {
  name: string;
  height: string;
  mass: string;
  nameNew?: string;
  isNewPerson?: boolean;
}

const Category: React.FC = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PeopleI | null>(null);

  const [people, setPeople] = useState<PeopleI[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchPeople = async () => {
      // implement only one list page - the people page - but can be extended to other categories if needed
      const results = await getByCategoryAPI('people');
      setPeople(results as PeopleI[]);
      setLoading(false);
    };
    fetchPeople();
  }, []);

  const handleDelete = (name: PeopleI['name']) => {
    setPeople(people.filter((person: PeopleI) => person.name !== name));
  };

  const handleEdit = (item: PeopleI) => {
    setSelectedPerson(item);
    setEditModalOpen(true);
  };
  const handleCreate = () => {
    setSelectedPerson({
      name: '',
      height: '',
      mass: '',
      isNewPerson: true,
    });
    setEditModalOpen(true);
  };
  const handleSave = () => {
    if (selectedPerson) {
      if (selectedPerson?.isNewPerson) {
        setPeople((prevPeople) => [...prevPeople, selectedPerson]);
      } else {
        setPeople(people.map((p: PeopleI) => (p.name === selectedPerson.name ? selectedPerson : p)));
      }
    }
    setEditModalOpen(false);
  };
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setSelectedPerson((prevPerson) => {
      if (prevPerson === null) return null;
      if (e.target.name === 'name') {
        return {
          ...prevPerson,
          nameNew: e.target.value,
        };
      }
      return { ...prevPerson, [e.target.name]: e.target.value };
    });
  };

  return (
    <Container maxWidth="lg">
      <h2>{category} Page</h2>
      <Button startIcon={<AddIcon />} onClick={handleCreate} color="primary">
        Create
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Mass</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </TableCell>
                  </TableRow>
                ))
              : people.map((person: PeopleI) => (
                  <TableRow key={person.name}>
                    <TableCell>{person?.nameNew || person.name}</TableCell>
                    <TableCell>{person.height}</TableCell>
                    <TableCell>{person.mass}</TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{ m: 1 }}
                        size="small"
                        onClick={() => handleEdit(person)}
                        variant="contained"
                        color="primary"
                        style={{ marginRight: '10px' }}
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ m: 1 }}
                        variant="outlined"
                        size="small"
                        endIcon={<DeleteIcon />}
                        onClick={() => handleDelete(person.name)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>{selectedPerson?.isNewPerson ? 'Create' : 'Edit'} Person</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedPerson?.nameNew || selectedPerson?.name || ''}
            onChange={handleChange}
          />
          <TextField margin="dense" name="height" label="Height" type="text" fullWidth value={selectedPerson?.height || ''} onChange={handleChange} />
          <TextField margin="dense" name="mass" label="Mass" type="text" fullWidth value={selectedPerson?.mass || ''} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Category;
