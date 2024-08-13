import { useState, useEffect } from 'react';
import { TextField, Card, CardContent, Typography, Button, Grid, CircularProgress, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

import useDebounce from '../hooks/debounce';
import { getAllCategoriesAPI, getDataByCategoriesAPI } from '../api';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByCategory, setCategoryResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const debouncedQuery = useDebounce(searchTerm, 1500);
  const getCategories = async () => {
    try {
      const categories = await getAllCategoriesAPI();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };
  const getDataByCategories = async () => {
    try {
      setLoading(true);
      const data = await getDataByCategoriesAPI(categories, debouncedQuery);
      setCategoryResults(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setCategoryResults({});
    }
  };
  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, [categories]);

  useEffect(() => {
    if (debouncedQuery.length > 0 && categories.length) {
      getDataByCategories();
    } else {
      setCategoryResults({});
    }
  }, [categories, debouncedQuery]);

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <TextField
        helperText={'Try to find Darth Vader'}
        fullWidth
        label="Search Star Wars"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {Object.keys(searchByCategory).map((category) => (
        <Box key={category} sx={{ mt: 2 }}>
          {searchByCategory[category].length > 0 && <Typography variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>}
          <Grid container spacing={2}>
            {searchByCategory[category]?.map((result: { name: string; title: string }, index: number) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography>
                      {result?.name || result?.title} {/* Display name or title depending on the entity */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {searchByCategory[category].length > 0 && (
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              <Link to={`/categories/${category}`} style={{ color: 'white', textDecoration: 'none' }}>
                View All
              </Link>
            </Button>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default SearchPage;
