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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function Dialog3({openDialog3,handleCloseDialog3,SetMinTime,SetMaxTime,minTime,maxTime,setHasThreeHold}){
    const [MinTimeInput, SetMinTimeInput] = useState(minTime ?? '');
    const [MaxTimeInput, SetMaxTimeInput] = useState(maxTime ?? '');

    useEffect(
      ()=>{
        SetMinTimeInput(minTime ?? '')
        SetMaxTimeInput(maxTime ?? '')
      },[minTime,maxTime]
    )

    const handleSave =()=>{
      if(MinTimeInput!=''||MaxTimeInput!=''){
          SetMinTime(MinTimeInput);
          SetMaxTime(MaxTimeInput);
          setHasThreeHold(true);
          toast.success("Lưu thành công")
          handleCloseDialog3();
      }
      else{
        toast.warning("Vui lòng nhập MinTime hoặc MaxTime");
      }
      
    }
    return(
        <Dialog open={openDialog3} onClose={handleCloseDialog3} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }}>
          THIẾT LẬP NGƯỠNG
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          {/* Các trường ngưỡng */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>1. Ngưỡng tối thiểu / tối đa:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Min Time (mm:ss)" variant="outlined" size="small" type="number" value={MinTimeInput} onChange={(e)=>SetMinTimeInput(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Max Time (mm:ss)" variant="outlined" size="small" type="number" value={MaxTimeInput} onChange={(e)=>SetMaxTimeInput(e.target.value)} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" color="primary" sx={{ width: "120px" }} onClick={handleCloseDialog3}>
            HỦY
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#1976D2", color: "white", width: "120px" }} onClick={()=>handleSave()}>
            LƯU
          </Button>
        </DialogActions>
      </Dialog>
    )

}