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
import { toast } from "react-toastify";
export function Dialog2({openDialog2,handleCloseDialog2,SetMinTime,SetMaxTime,setHasThreeHold}){
    const handleConfirmDefault = ()=>{
      SetMinTime();
      SetMaxTime();
      setHasThreeHold(false);
      handleCloseDialog2();
      toast.success("Lấy ngưỡng mặc định thành công")
    }
    return(
        <Dialog open={openDialog2} onClose={handleCloseDialog2} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }}>
          THÔNG TIN NGƯỠNG MẶC ĐỊNH
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          <Box sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 1 }}>
            <Typography variant="body1"><b>1. MIN TIME:</b> 10m <span style={{ float: "right" }}><b>MAX TIME:</b> 40m</span></Typography>
          </Box>
          <Box sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 1 }}>
            <Typography variant="body1"><b>2. DEVIATION FROM MEAN:</b></Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>Standard Deviation: 2.5 ・ Mean Time: 35m</Typography>
          </Box>
          <Box sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 1 }}>
            <Typography variant="body1"><b>3. SCORE-TIME CORRELATION:</b></Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>Mean Time: 35m</Typography>
          </Box>
          <Box>
            <Typography variant="body1"><b>4. ANOMALY SCORE:</b></Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>0.8 (0 - 1)</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" color="primary" sx={{ width: "120px" }} onClick={handleCloseDialog2}>
            HỦY
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#1976D2", color: "white", width: "120px" }} onClick={()=>handleConfirmDefault()}>
            XÁC NHẬN
          </Button>
        </DialogActions>
      </Dialog>
    )
}