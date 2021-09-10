import { Box, Container } from '@material-ui/core';

export const NotFoundPage = (): JSX.Element => {
  return (
    <Container maxWidth="xl" style={{ height: '100%' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        fontSize={48}
        textAlign="center"
      >
        <pre>
          <h1>404</h1>
          <h3>Page not found.</h3>
        </pre>
      </Box>
    </Container>
  );
};
