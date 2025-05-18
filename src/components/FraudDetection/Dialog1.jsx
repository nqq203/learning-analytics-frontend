import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton

} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
export function Dialog1({openDialog1,handleCloseDialog1,handleOpenDialog3,handleOpenDialog2}){


    return(
        <Dialog open={openDialog1} onClose={handleCloseDialog1} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          NGƯỠNG CHƯA ĐƯỢC THIẾT LẬP
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          <NotificationsIcon sx={{ fontSize: 60, color: "#1976D2" }} />
          <Typography sx={{ mt: 2, color: "gray" }}>
            Bạn chưa thiết lập ngưỡng. Thiết lập ngưỡng của bạn hoặc tiếp tục với ngưỡng mặc định để tiếp tục phân tích.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" color="primary" onClick={handleCloseDialog1}>
            HỦY
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#8E24AA", color: "white" }} onClick={handleOpenDialog3}>
            THIẾT LẬP
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#1976D2", color: "white" }} onClick={handleOpenDialog2}>
            TIẾP TỤC
          </Button>
        </DialogActions>
      </Dialog>

    )

}