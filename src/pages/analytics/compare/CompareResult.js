import ScoreComparisonCharts from "@/components/CompareResults/charts/ScoreComparisonCharts";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CompareResult = ({
  data,
  mode,
  onBack,
  criteria,
  course,
  selectedItems,
  chartType = "bar",
}) => {
  if (!data) return null;

  return (
    <Card style={{ marginTop: "32px" }}>
      <CardContent>
        <TableContainer
          component={Paper}
          style={{ marginTop: "16px" }}
        ></TableContainer>

        <div style={{ marginTop: "32px" }}>
          <ScoreComparisonChartsonCharts
            chartType={chartType}
            data={Object.values(data)}
            getDisplayName={(item) => item.class_name}
            getClassColor={(index) => {
              const colors = [
                "#8884d8",
                "#82ca9d",
                "#ffc658",
                "#ff8042",
                "#8dd1e1",
              ];
              return colors[index % colors.length];
            }}
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          onClick={onBack}
          style={{ marginTop: "16px" }}
        >
          Quay lại
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompareResult;
