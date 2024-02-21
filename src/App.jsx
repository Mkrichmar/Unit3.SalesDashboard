import { useState } from 'react';
import './App.css';
import { Paper, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/* The followin allowed for collapsing sidebar */
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import * as React from 'react';

/* The following allowed for the chart */
import { BarChart } from '@mui/x-charts/BarChart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { mockTransactions } from './mockData';

/* My list creates a customer scroll list with amount spent and date of transaction */

function MyList() {
  return (
    <>
    <h2>Customer Log</h2>
    
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {mockTransactions.map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`Customer ${sectionId.txId}`}</ListSubheader>
            {[{sectionId}].map((user) => (
              <ListItem key={`item-${sectionId}-${user}`}>
                <ListItemText primary={`Name: ${user.sectionId.user}`}/>
                <ListItemText secondary={`Money Spent: ${user.sectionId.cost}`}></ListItemText>
                <ListItemText secondary={`Date: ${user.sectionId.date}`}></ListItemText>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
    </>
  );
}

/* My Chart organizes revenue by year by mapping over mock transactions */

function MyChart() {
  let nineteen = 0;
  let twenty = 0;
  let twentyone = 0;
  let twentytwo = 0

  mockTransactions.map((transaction) => {
    if (transaction.date.includes('2019')) {
      nineteen += parseInt(transaction.cost)
    } else if (transaction.date.includes('2020')) {
      twenty += parseInt(transaction.cost)
    } else if (transaction.date.includes('2021')) {
      twentyone += parseInt(transaction.cost)
    } else twentytwo += parseInt(transaction.cost)
  });
  
  return (
    <>
    <h2>Revenue by Year</h2>
    <BarChart
      series={[
        { data: [nineteen, twenty, twentyone, twentytwo] },
      ]}
      height={290}
      xAxis={[{ data: ['2019', '2020', '2021', '2022'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
    </>
  );
}

/* Displays Revenues earned */

function RevenuesEarned() {
  let revenue = 0;
    mockTransactions.forEach((transaction) => {
      revenue += parseInt(transaction.cost)
    });
    console.log(revenue);
    return `$${revenue}`;
  
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/* Displays sidebar */

function MyAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Dashboard
        </AccordionSummary>
        <AccordionDetails>
          1. The customer log contains all restaurant transactions between 2019 and 2022.        
        </AccordionDetails>
        <AccordionDetails>
          2. The total revenues earned are displayed
        </AccordionDetails>
        <AccordionDetails>
          3. A chart showing the revenues earned by year demonstrates that 2022 was the most profitable year.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Address
        </AccordionSummary>
        <AccordionDetails>
          123 Restaurant Row
        </AccordionDetails>
        <AccordionDetails>
          New York, NY 11111
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Data Acknowledgment
        </AccordionSummary>
        <AccordionDetails>
          I have read the following material and understand it.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  )
  
}


/* Displays all other components in a grid */

function MyGrid() {
  return (
    <>
    {/* <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <h1>Heading</h1>
          </Item>
        </Grid>
      </Grid>
    </Box> */}
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <h2>Matt's Restaurant</h2>
            <MyAccordion></MyAccordion>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <MyList></MyList>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <>
            <h2>Revenues Earned</h2>
            <h2><RevenuesEarned/></h2>
            </>
          </Item>
        </Grid>
        <Grid item xs={7}>
          <Item> 
            <MyChart></MyChart>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </>
  )
  
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyGrid></MyGrid>
    </>
  )
}

export default App
