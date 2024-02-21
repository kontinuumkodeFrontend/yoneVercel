import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const  PaginationComponent = () => {
  return (
    <Stack spacing={3}>
      <Pagination count={8} variant="outlined" shape="rounded" />
    </Stack>
  );
}

export default PaginationComponent;