import React from 'react';

const App = () => {
  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1>StyleNest!!</h1>
      </header>
      <main>
        <p>The start of Team D app!</p>
      </main>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: 'white',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: 'navy',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
};

export default App;
