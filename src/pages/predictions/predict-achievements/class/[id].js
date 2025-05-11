import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import StudentList from "@/components/PredictionAchievements/StudentList";

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
  flex-direction: column;
  gap: 1rem;

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const LearningOutComeItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const AnalyticsBtn = styled.div`
  cursor: pointer;
  padding-inline: 1.5rem;
  height: 40px;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background-color: var(--blue-700);
  border: none;
  border-radius: 4px;
  font-weight: bold;

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

const TableHeader = ["MSSV", "Họ tên", "Lớp", "Môn", "Khóa", "Hành Động"];
const TableContent = [
  {
    ID: "1",
    MSSV: "21125434",
    Name: "Nguyễn Văn A",
    Class: "21CLC08",
    Subject: "Cơ sở dữ liệu nâng cao",
    ClassOf: "2021",
  },
  {
    ID: "2",
    MSSV: "21125435",
    Name: "Nguyễn Văn B",
    Class: "21CLC09",
    Subject: "Cơ sở dữ liệu nâng cao",
    ClassOf: "2021",
  },
  {
    ID: "3",
    MSSV: "21125435",
    Name: "Nguyễn Văn C",
    Class: "21CLC10",
    Subject: "Cơ sở dữ liệu nâng cao",
    ClassOf: "2021",
  },
  {
    ID: "4",
    MSSV: "21125435",
    Name: "Nguyễn Văn C",
    Class: "21CLC10",
    Subject: "Cơ sở dữ liệu nâng cao",
    ClassOf: "2021",
  },
  {
    ID: "5",
    MSSV: "21125435",
    Name: "Nguyễn Văn C",
    Class: "21CLC10",
    Subject: "Cơ sở dữ liệu nâng cao",
    ClassOf: "2021",
  },
];

const ClassStudentContainer = () => {
  const [chosenStudent, setChosenStudent] = useState([]);
  const router = useRouter();

  const handleNav = () => {
    if (chosenStudent.length === 0) {
      alert("Chọn ít nhất một sinh viên");
    } else {
      const encodedData = encodeURIComponent(JSON.stringify(chosenStudent));
      router.push(`/predictions/predict-achievements/send-noti?data=${encodedData}`);
    }
  };

  const handleSearch = () => {
    console.log("Searching...");
  };

  return (
    <LearningOutcomesContainer>
      <LearningOutComeContainerBody>
        <LearningOutComeHeader>
          <LearningOutComeItemsContainer>
          <FormControl style={{ minWidth: "30rem" }} variant="outlined">
            <TextField
              placeholder="Tìm kiếm"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: "12px" }}>
                    <IconButton
                      onClick={handleSearch}
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

            <IconButton sx={{ padding: "5px", marginLeft: "5px" }}>
              <FilterAltIcon sx={{ color: "gray" }} />
            </IconButton>
          </LearningOutComeItemsContainer>

          <LearningOutComeItemsContainer>
            <AnalyticsBtn onClick={handleNav}>Dự đoán</AnalyticsBtn>
          </LearningOutComeItemsContainer>
        </LearningOutComeHeader>

        <LineDivider />

        <StudentList
          TableHeader={TableHeader}
          TableContent={TableContent}
          setChosenStudentOuter={setChosenStudent}
        />
      </LearningOutComeContainerBody>
    </LearningOutcomesContainer>
  );
};

export default ClassStudentContainer;
