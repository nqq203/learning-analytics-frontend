import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'
import CourseTable from "@/components/ClassManagement/CourseTable";
import { useRouter } from "next/router";

const ClassManagementContainer = styled.div`
    margin: auto;
    width: 97%;
    padding-block:20px;
    
    
    
`
const ClassManagementContainerBody = styled.div`
  display:flex;
  flex-direction:column;
  gap:1rem;

`
const ClassManagementHeader = styled.div`
  display:flex;
  flex-direction:row;
  gap:2rem;
  
  align-items:center;
`

const ClassManagementItemsContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  
  
`



const AnalyticsBtn = styled.div`
    cursor:pointer;
    padding-inline:2rem;
    padding-block:1rem;
    color:white;
    font-size:1.2rem;
    background-color:var(--blue-600);
    border:none;
    border-radius:10px;
    font-weight:bold;

    &:hover{
        background-color:var(--blue-400);
    }
    &:active{
    
        background-color:var(--blue-500);
    }


`



const LineDivider = styled.div`
  border:0.1px solid gray;
  width:100%;
`
const rows = [
  {
    id:1,
    courseName:"Cơ sở dữ liệu nâng cao",
    faculty:"Công nghệ thông tin",
    specialized:"Hệ thống thông tin",
    credit:4
  },{
    id:2,
    courseName:"Hệ quản trị cơ sở dữ liệu",
    faculty: "Công nghệ thông tin",
    specialized: "Hệ thống thông tin",
    credit:4
  },{
    id:3,
    courseName:"Hệ quản trị trí tuệ kinh doanh",
    faculty: "Công nghệ thông tin",
    specialized: "Hệ thống thông tin",
    credit:4
  },{
    id:4,
    courseName:"Khởi nghiệp",
    faculty: "Công nghệ thông tin",
    specialized: "Chưa có",
    credit:4
  },
  {
    id:5,
    courseName:"Khởi nghiệp",
    faculty: "Công nghệ thông tin",
    specialized: "Chưa có",
    credit:4
  },
  {
    id:6,
    courseName:"Khởi nghiệp",
    faculty: "Công nghệ thông tin",
    specialized: "Chưa có",
    credit:4
  },{
    id:7,
    courseName:"Khởi nghiệp",
    faculty: "Công nghệ thông tin",
    specialized: "Chưa có",
    credit:4
  },{
    id:8,
    courseName:"Khởi nghiệp",
    faculty: "Công nghệ thông tin",
    specialized: "Chưa có",
    credit:4
  }

]

  const columns = [
    { id: "courseName", label: "Môn học", align: "left" },
    { id: "faculty", label: "Khoa", align: "center" },
    { id: "specialized", label: "Chuyên ngành", align: "center" },
    { id: "credit", label: "Tín chỉ", align: "left" }
  ];

export default function ClassManagement() {
  const router = useRouter();
  const handleViewClass = (id) => {
    console.log(id);
    router.push(`/data-management/class-management/${id}`)
  };


    return (
      <ClassManagementContainer>
        <ClassManagementContainerBody>
        
            <ClassManagementItemsContainer>

                 
                <TextField
            variant="outlined"
            label="Tìm kiếm"
            // value={search}
            // onChange={handleSearchChange}
            style={{ width: "50%", minWidth: 200 }}
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

            </ClassManagementItemsContainer>

            <LineDivider/>
            <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "20px", fontWeight: "700" }}>
                Tổng số môn hiển thị: {rows.length}
              </span>


                  <CourseTable
                      filteredRows={rows}
                      columns={columns}
                      handleActions={handleViewClass}
                  />
            
          </div>
        </ClassManagementContainerBody>
      </ClassManagementContainer>
    );
  }