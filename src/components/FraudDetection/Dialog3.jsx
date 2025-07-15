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

    // Validate số giây, không cho nhập số nhỏ hơn 0, chỉ cho số nguyên không âm
    const isValidSeconds = (value) => {
      if (value === '' || value === undefined) return true;
      const num = Number(value);
      return Number.isInteger(num) && num >= 0;
    };

    const handleInputChange = (setter) => (e) => {
      const val = e.target.value;
      // Chỉ cho nhập số nguyên không âm
      if (/^\d*$/.test(val)) {
        setter(val);
      }
    };

    const handleSave = () => {
      if (MinTimeInput === '' && MaxTimeInput === '') {
        toast.warning("Vui lòng nhập Thời gian tối thiểu và tối đa");
        return;
      }
      if (!isValidSeconds(MinTimeInput) || !isValidSeconds(MaxTimeInput)) {
        toast.warning("Vui lòng nhập số giây hợp lệ (>= 0)");
        return;
      }
      if (MinTimeInput !== '' && MaxTimeInput !== '') {
        const min = Number(MinTimeInput);
        const max = Number(MaxTimeInput);
        if (max <= min) {
          toast.warning("Thời gian tối đa phải lớn hơn thời gian tối thiểu");
          return;
        }
      }
      SetMinTime(MinTimeInput);
      SetMaxTime(MaxTimeInput);
      setHasThreeHold(true);
      toast.success("Lưu thành công");
      handleCloseDialog3();
    }
    return(
        <Dialog open={openDialog3} onClose={handleCloseDialog3} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }}>
          THIẾT LẬP NGƯỠNG
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          {/* Các trường ngưỡng */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>1. Ngưỡng tối thiểu / tối đa:</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField fullWidth label="Thời gian tối thiểu (giây)" type="text" variant="outlined" size="small" value={MinTimeInput} onChange={handleInputChange(SetMinTimeInput)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Thời gian tối đa (giây)" type="text" variant="outlined" size="small" value={MaxTimeInput} onChange={handleInputChange(SetMaxTimeInput)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }} />
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