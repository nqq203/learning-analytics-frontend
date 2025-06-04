import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Button,
  Box
} from "@mui/material";

import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";


import SearchIcon from '@mui/icons-material/Search';
import {
  Search,
  Settings,
  Edit,
  Delete,
  ArrowBack,
  Add,
  FileDownload,
  Info,
} from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter } from "next/router";
import ClassTable from "@/components/ClassManagement/ClassTable";
import InsertModal from "@/components/ClassManagement/InsertModal";
import EditModal from "@/components/ClassManagement/EditModal";
import ImportFileModal from "@/components/ClassManagement/ImportFileModal";





const semester =  [1,2,3]
const academicYear = ["2014-2018","2015-2019","2021-2025","2022-2026"]
const rows =[
    {
        id:1,
        className:"21CLC08",
        courseName:"Cơ sở dữ liệu nâng cao",
        academicYear:"2014-2018",
        semester:2,
        classAmount:55
    },
    {
        id:2,
        className:"21CLC09",
        courseName:"Cơ sở dữ liệu nâng cao",
        academicYear:"2015-2019",
        semester:3,
        classAmount:55
    },
    {
        id:3,
        className:"21CLC10",
        courseName:"Cơ sở dữ liệu nâng cao",
        academicYear:"2021-2025",
        semester:1,
        classAmount:55
    },
    {
        id:4,
        className:"21CLC10",
        courseName:"Cơ sở dữ liệu nâng cao",
        academicYear:"2022-2026",
        semester:1,
        classAmount:55
    },
    {
        id:5,
        className:"21CLC10",
        courseName:"Cơ sở dữ liệu nâng cao",
        academicYear:"2022-2026",
        semester:1,
        classAmount:55
    },
    {
        id:6,
        className:"21CLC10",
        courseName:"Cơ sở dữ liệu nâng cao",
        academicYear:"2022-2026",
        semester:1,
        classAmount:55
    },
    {
        id:7,
        className:"21CLC10",
        courseName:"Cơ sở dữ liệu nâng cao",
        academicYear:"2022-2026",
        semester:1,
        classAmount:55
    },
    {
        id:8,
        className:"21CLC10",
        courseName:"Cơ sở dữ liệu nâng cao",
        academicYear:"2022-2026",
        semester:1,
        classAmount:55
    }
]
const columns = [
    { id: "className", label: "Lớp học", align: "center" },
    { id: "courseName", label: "Môn học", align: "center" },
    { id: "academicYear", label: "Khóa", align: "center" },
    { id: "semester", label: "Học kỳ", align: "center" },
    { id: "classAmount", label: "Số sinh viên", align: "center" }
  ];
export default function MainClassManagement() {
    const router = useRouter();
    const [chosenAcademicYear,setChosenAcademicYear] = useState("");
    const [chosenSemester,setChosenSemester] = useState("");
    const [modalInsert,setModalInsert] = useState(false);

    const [modalUpdate,setModalUpdate] = useState(false);
    const [classEdit,setClassEdit] = useState("");
    
    
    const [importFile,setImportFile] = useState(false);

    const handleDelete = (id)=>{
        console.log("DELETE: ",id)
    }
    const handleEdit = (id) =>{
        console.log("EDIT: ",id)

        setModalUpdate(true)
        setClassEdit(id)

    }

    const handleViewStudent = (id) => {
        console.log(id);
        router.push(`/data-management/${id}`)
     };

    const handleChangeSemester = (value) =>
      {
        setChosenSemester(value)
       
      }

    const handleChangeAcedemicYear = (value)=>{
        setChosenAcademicYear(value) 
        
      }

    return (
      <Container>
            
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
                    <TextField
            variant="outlined"
            label="Tìm kiếm"
            
            style={{ width: "70%", minWidth: 500 }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    // onClick={handleSearch}
                    sx={{
                      backgroundColor: "#1976D2",
                      borderRadius: "0 4px 4px 0",
                      padding: "10px",
                      height: "100%",
                      '&:hover': {
                        backgroundColor: "#1976d2", 
                      },
                    }}
                  >
                    <SearchIcon sx={{ color: "white", fontSize: "20px" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              '& .MuiOutlinedInput-root': {
                paddingRight: 0,
              },
            }}
          />

            <FormControl style={{ width: "20%", minWidth: 250 }} size="small">
                <InputLabel>Khóa</InputLabel>
                    <Select label="Chọn khóa" onChange={(e)=>handleChangeAcedemicYear(e.target.value)}>
                        <MenuItem value="">Tất cả</MenuItem>
                        {
                          academicYear.map((item,index)=>{
                            return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                          })
                        }
                        
                    </Select>
            </FormControl>
                
                
          <FormControl style={{ width: "20%", minWidth: 250 }} size="small">
                <InputLabel>Kỳ</InputLabel>
                  <Select label="Chọn kỳ" 
                    onChange={(e)=>handleChangeSemester(e.target.value)}
                  >
                      <MenuItem value="">Tất cả</MenuItem>

                      {
                        semester.map((item,index)=>{
                          return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                        })
                      }

                  </Select>
          </FormControl>


          
            
                <ActionButton 
                    startIcon={<Add />}
                    style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
                    variant="contained"
                    onClick={()=>setModalInsert(true)}
                    >
                        Thêm</ActionButton>

                

                <ActionButton 
                    startIcon={<FileDownload />}
                    color="primary"
                      style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
                    onClick={()=>setImportFile(true)}
                    variant="contained"
                    >Tải file</ActionButton>

             

                          </div>
                </Header>





            
          <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "20px", fontWeight: "700" }}
          >
             Tổng số môn hiển thị: {rows.length}
          </span>

        
            
            

            <ClassTable 
            filteredRows={rows} 
            columns={columns} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
            handleViewStudent={handleViewStudent}
            ></ClassTable>

            {importFile?<ImportFileModal  Modal={importFile}setModal={setImportFile}></ImportFileModal>:null}

            {modalInsert?<InsertModal Modal= {modalInsert}setModal={setModalInsert}/> :null}

            {modalUpdate?<EditModal Modal={modalUpdate} setModal={setModalUpdate} classId={classEdit}></EditModal>: null}
        </div>
        

      </Container>
    );
  }