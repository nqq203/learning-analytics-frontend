import { Card, CardContent, Grid, Typography } from "@mui/material";

const cardData = [
  { title: "SỐ LƯỢNG MÔN", valueKey: "subjects" },
  { title: "SỐ LỚP", valueKey: "classes" },
  { title: "SỐ SINH VIÊN", valueKey: "students" },
  { title: "TỈ LỆ SV CÓ NGUY CƠ RỚT", valueKey: "dropoutRate", isPercentage: true },
];

export function DashboardCards({ data }) {
  return (
    <Grid container spacing={3}>
      {cardData.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                {item.title}
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {item.isPercentage ? `${data[item.valueKey]}%` : data[item.valueKey]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
