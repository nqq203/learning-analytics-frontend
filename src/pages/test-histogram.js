import React from 'react';
import { Box, Container } from '@mui/material';
import HistogramChartAnalytics from "@/components/Analytics/Charts/HistogramChart";

const TestHistogram = () => {
  // Test data với cấu trúc chính xác
  const testLoData = [
    { range: "0-4", count: 5 },
    { range: "4-6", count: 8 },
    { range: "6-8", count: 12 },
    { range: "8-10", count: 10 }
  ];

  return (
    <Container>
      <h1>Test Histogram Component</h1>
      
      <Box mt={3}>
        <h3>Test 1: Valid LO Data</h3>
        <HistogramChartAnalytics 
          data={[]}
          selectedGrades={[]}
          isLOChart={true}
          loCode="LO1"
          loData={testLoData}
        />
      </Box>

      <Box mt={3}>
        <h3>Test 2: Invalid LO Data (not array)</h3>
        <HistogramChartAnalytics 
          data={[]}
          selectedGrades={[]}
          isLOChart={true}
          loCode="LO2"
          loData={{invalid: "data"}}
        />
      </Box>

      <Box mt={3}>
        <h3>Test 3: Regular Grade Data</h3>
        <HistogramChartAnalytics 
          data={[
            {midtermGrade: 7.5, finalGrade: 8.0},
            {midtermGrade: 6.5, finalGrade: 7.0},
            {midtermGrade: 8.5, finalGrade: 9.0}
          ]}
          selectedGrades={['midtermGrade', 'finalGrade']}
          isLOChart={false}
        />
      </Box>
    </Container>
  );
};

export default TestHistogram;
