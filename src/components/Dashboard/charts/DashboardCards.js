import {
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { grey } from "@mui/material/colors";

const cardData = [
  {
    title: "Số lượng môn",
    valueKey: "subjects",
    icon: <SchoolIcon fontSize="small" />,
  },
  {
    title: "Số lớp",
    valueKey: "classes",
    icon: <ClassIcon fontSize="small" />,
  },
  {
    title: "Số sinh viên",
    valueKey: "students",
    icon: <PeopleIcon fontSize="small" />,
  },
  {
    title: "Tỉ lệ SV có nguy cơ rớt",
    valueKey: "dropoutRate",
    isPercentage: true,
    icon: <WarningAmberIcon fontSize="small" />,
  },
];

export function DashboardCards({ data }) {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      {cardData.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              height: "100%",
              border: "1px solid",
              borderColor: "#bbdefb",
              borderRadius: 2,
              boxShadow: "none",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 3, position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: theme.palette.primary.main,
                }}
              >
                {item.icon}
              </Box>

              {/* Title */}
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: grey[700] }}
              >
                {item.title}
              </Typography>

              {/* Value */}
              <Typography variant="h4" sx={{ mt: 1, color: "#000" }}>
                {data?.[item.valueKey] !== undefined
                  ? item.isPercentage
                    ? `${data[item.valueKey]}%`
                    : data[item.valueKey]
                  : "--"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
