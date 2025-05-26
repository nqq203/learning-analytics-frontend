import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Grid,
  Divider
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Close } from "@mui/icons-material";





export default function InsertModal({Modal,setModal,classId}){
    const CloseModal=()=>{
        setModal(false);
    }
    return(
        // <Backdrop onClick={()=>CloseModal()}>
        <Dialog open={Modal} onClose={CloseModal} fullWidth maxWidth="md">
            <DialogTitle
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pb: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                      Thêm Lớp Vào Cơ Sở Dữ Liệu
                    </Typography>
                    <IconButton onClick={CloseModal} aria-label="close">
                      <Close />
                    </IconButton>
                  </DialogTitle>
            <Divider style={{marginBottom:"1rem"}} />
            
            <DialogContent sx={{ p: 0 }}>
                
                    <Box sx={{ px: 2, pb: 2 }}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                      Thông tin A:
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      
                                      variant="outlined"
                                      size="small"
                                    />
                                  </Grid>
                    
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                      Thông tin B:
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      
                                      variant="outlined"
                                      size="small"
                                    />
                                  </Grid>
                    
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                      Thông tin C:
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      
                                      variant="outlined"
                                      size="small"
                                    />
                                  </Grid>
                    
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                      Thông tin D:
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      
                                      variant="outlined"
                                      size="small"
                                    />
                                  </Grid>
                    
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                      Thông tin A:
                                    </Typography>
                                    <TextField fullWidth variant="outlined" size="small" />
                                  </Grid>
                    
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                      Thông tin B:
                                    </Typography>
                                    <TextField fullWidth variant="outlined" size="small" />
                                  </Grid>
                                </Grid>
                              </Box>
                

                <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 2,
                            mt: 2,
                          }}
                        >

                          <Button variant="outlined" onClick={CloseModal} sx={{ width: "48%" }}>
                            ĐÓNG
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            
                            sx={{ width: "48%" }}
                          >
                            Thêm Lớp
                          </Button>

                        </Box>

            </DialogContent>


        
        </Dialog>
        
        
    )
}

