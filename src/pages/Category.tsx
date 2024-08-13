import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getByCategoryAPI } from '../api';

interface PeopleI {
  name: string;
  height: string;
  mass: string;
}

const Category: React.FC = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);

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

  const handleEdit = (name: PeopleI) => {
    console.log(`Edit person: ${name}`);
  };

  return (
    <Container maxWidth="lg">
      <h2>{category} Page</h2>
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
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.height}</TableCell>
                    <TableCell>{person.mass}</TableCell>
                    <TableCell align="right">
                      <Button size="small" onClick={() => handleEdit(person)} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" endIcon={<DeleteIcon />} onClick={() => handleDelete(person.name)} color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Category;
