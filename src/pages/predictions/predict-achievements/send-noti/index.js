import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
} from "@mui/material";


import {
  ActionButton,
  BodyWrapper,
  Container,
  Header,
  InformationItem,
  InformationWrapper,
} from "@/components/Analytics/Styles/Styles";



import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PredictionStudentList from "@/components/PredictionAchievements/PredictionStudentList";
import ModalSuggestion from "@/components/PredictionAchievements/ModalSuggestion";

const LearningOutcomesContainer = styled.div`
  margin: auto;
  width: 97%;
  padding-block: 20px;
`;

const LearningOutComeContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LearningOutComeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AnalyticsBtn = styled.div`
  cursor: pointer;
  padding-inline: 1.5rem;
  padding-block: 1rem;
  height: 40px;
  color: white;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  background-color: var(--blue-700);
  border: none;
  border-radius: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--blue-900);
  }
  &:active {
    background-color: var(--blue-900);
  }
`;

const LineDivider = styled.div`
  border: 0.1px solid gray;
  width: 100%;
`;

const TableHeader = [
  {id:"MSSV",label:"MSSV",align:"center"},
  {id:"Name",label:"Họ tên",align:"center"},
  {id:"Class",label:"Lớp",align:"center"},
  {id:"Subject",label:"Môn",align:"center"},
  {id:"ClassOf",label:"Khóa",align:"center"},
  {id:"PredictAchivement",label:"Thành tích dự đoán",align:"center"},
];




const SendNoti = () => {
  const userId = "12456";
  const [originalTableContent, setOriginalTableContent] = useState([]);
  const [chosenStudent, setChosenStudent] = useState([]);
  const [studentModal, setStudentModal] = useState({});
  const router = useRouter();
  const [TableContent, setTableContent] = useState([]);
  const [modalOpen, setModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState("");

  const handleFilter = () => {
    const filtered = originalTableContent.filter((student) => {
      return selectedAchievement ? student.PredictAchivement === selectedAchievement : true;
    });
    setTableContent(filtered);
  };

  const handleSearch = () => {
    console.log("Searching...");
  };

  useEffect(() => {
    const { data } = router.query;
    const chosenStudents = data ? JSON.parse(decodeURIComponent(data)) : [];
    setChosenStudent(chosenStudents);
    if (router.query.data) {
      setTableContent([
        {
          ID: "1",
          MSSV: "21125434",
          Name: "Nguyễn Văn A",
          Class: "21CLC08",
          Subject: "Cơ sở dữ liệu nâng cao",
          ClassOf: "2021",
          PredictAchivement: "Giỏi",
        },
        {
          ID: "2",
          MSSV: "21125435",
          Name: "Nguyễn Văn B",
          Class: "21CLC09",
          Subject: "Cơ sở dữ liệu nâng cao",
          ClassOf: "2021",
          PredictAchivement: "Khá",
        },
        {
          ID: "3",
          MSSV: "21125435",
          Name: "Nguyễn Văn C",
          Class: "21CLC10",
          Subject: "Cơ sở dữ liệu nâng cao",
          ClassOf: "2021",
          PredictAchivement: "Trung bình",
        },
        {
          ID: "4",
          MSSV: "21125435",
          Name: "Nguyễn Văn C",
          Class: "21CLC10",
          Subject: "Cơ sở dữ liệu nâng cao",
          ClassOf: "2021",
          PredictAchivement: "Yếu",
        },
        {
          ID: "5",
          MSSV: "21125435",
          Name: "Nguyễn Văn C",
          Class: "21CLC10",
          Subject: "Cơ sở dữ liệu nâng cao",
          ClassOf: "2021",
          PredictAchivement: "Khá",
        },
      ]);
    }
  }, [router.query.data]);


  const CloseModal = ()=>{

     setModal(false);
  }

  const handleNav = () => {
    // Gửi thông báo
  };
  
  return (
    <Container>
      
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>

           <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between", width: "100%" }}>

            
        
        <TextField
          style={{ width: "70%", minWidth: 200 }}
          placeholder="Tìm kiếm"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ marginRight: "12px" }}>
                <IconButton
                  // onClick={handleSearch}
                  edge="end"
                  sx={{
                    backgroundColor: "#1976D2",
                    borderRadius: "0 4px 4px 0",
                    height: "40px",
                    width: "40px",
                    "&:hover": {
                      backgroundColor: "#1565C0",
                    },
                  }}
                >
                  <SearchIcon sx={{ color: "white", fontSize: "20px" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: "40px",
              paddingRight: "0px",
              borderRadius: "4px",
            },
            '& input': {
              padding: "10px 14px",
            },
          }}
        />
      


          <FormControl sx={{ minWidth: "120px", height: "40px" }} variant="outlined">
            <InputLabel sx={{ fontSize: "1rem", top: "-6px" }}>Xếp loại</InputLabel>
            <Select
              value={selectedAchievement}
              onChange={(e) => setSelectedAchievement(e.target.value)}
              label="Chọn Xếp loại"
              sx={{
                height: "40px",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="Xuất sắc">Xuất sắc</MenuItem>
              <MenuItem value="Giỏi">Giỏi</MenuItem>
              <MenuItem value="Khá">Khá</MenuItem>
              <MenuItem value="Trung bình">Trung bình</MenuItem>
              <MenuItem value="Yếu">Yếu</MenuItem>
              <MenuItem value="Kém">Kém</MenuItem>
            </Select>
          </FormControl>


          <FormControl sx={{ minWidth: "120px", height: "40px" }} variant="outlined">
            <InputLabel sx={{ fontSize: "1rem", top: "-6px" }}>Khóa</InputLabel>
            <Select
              label="Chọn khóa"
              sx={{
                height: "40px",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <MenuItem value="21">21</MenuItem>
              <MenuItem value="22">22</MenuItem>
              <MenuItem value="23">23</MenuItem>
            </Select>
          </FormControl>

          <IconButton
            onClick={handleFilter}
            sx={{ padding: "5px", marginLeft: "5px" }}
          >
            <FilterAltIcon sx={{ color: "gray" }} />
          </IconButton>


          <AnalyticsBtn onClick={() => handleNav()}>
            Gửi Thông Báo
          </AnalyticsBtn>

          </div>
        </Header>

       

        <PredictionStudentList
          columns={TableHeader}
          filteredRows={TableContent}
          setChosenStudentOuter={setChosenStudent}
          setModal={setModal}
          setStudentModal={setStudentModal}
        />

        
          <ModalSuggestion
            open = {modalOpen}
            CloseModal = {CloseModal}
            studentID={"124"}
            setModal={setModal}
            student={studentModal}
          />
        
      
    </Container>
  );
};

export default SendNoti;
