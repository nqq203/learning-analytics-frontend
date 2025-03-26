import React, { useEffect, useState } from "react";
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import { Overlay, Modal, CloseButton, Header } from "../Styles/Styles";
import { Close as CloseIcon } from "@mui/icons-material";
import styled from "styled-components";

const AnalyticConfig = ({ onClose, onApply }) => {
  const [selectedFields, setSelectedFields] = useState({
    grades: [],
    chartTypes: [],
    otherFields: [],
  });
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    console.log(selectedFields);
  }, [selectedFields]);

  const handleFieldChange = (e, category) => {
    const { value, checked } = e.target;
    setSelectedFields((prev) => {
      const updatedFields = { ...prev };
      if (category === "grades") {
        const allOptions = ["midtermGrade", "finalGrade", "totalGrade", "practiceGrade", "projectGrade"];
        if (value === "allGrade") {
          updatedFields.grades = checked ? allOptions : [];
        } else {
          updatedFields.grades = checked
            ? [...updatedFields.grades, value]
            : updatedFields.grades.filter((item) => item !== value);
        }
      } else if (category === "chartTypes") {
        const allOptions = ["pie", "column", "scatter", "histogram", "radar"];
        if (value === "allChart") {
          updatedFields.chartTypes = checked ? allOptions : [];
        } else {
          updatedFields.chartTypes = checked
            ? [...updatedFields.chartTypes, value]
            : updatedFields.chartTypes.filter((item) => item !== value);
        }
      } else if (category === "otherFields") {
        const allOptions = ["classification", "passRate"];
        if (value === "allOthers") {
          updatedFields.otherFields = checked ? allOptions : [];
        } else {
          updatedFields.otherFields = checked
            ? [...updatedFields.otherFields, value]
            : updatedFields.otherFields.filter((item) => item !== value);
        }
      }
      return updatedFields;
    });
  };

  useEffect(() => {
    if (selectedFields.chartTypes.length === 0 || selectedFields.grades.length === 0) {
      setIsDisabledButton(true);
    } else {
      setIsDisabledButton(false);
    }
  }, [selectedFields]);

  const generateChartData = () => {
    onApply(selectedFields); // Pass the selected fields and chart data to parent component
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>Thiết lập thống kê</h2>
          <Tooltip title="Close">
            <CloseButton onClick={onClose} />
          </Tooltip>
        </Header>

        <Box style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
          {/* Left Side: Field Selection (Grades) */}
          <Box style={{ width: "30%" }}>
            <FormControl component="fieldset" fullWidth>
              <FormGroup>
                <h3 id="point-label">Điểm</h3>
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "grades")} value="allGrade" checked={selectedFields.grades.length === 5} />}
                  label="Tất cả"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "grades")} value="midtermGrade" checked={selectedFields.grades.includes("midtermGrade")} />}
                  label="Điểm giữa kỳ"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "grades")} value="finalGrade" checked={selectedFields.grades.includes("finalGrade")} />}
                  label="Điểm cuối kỳ"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "grades")} value="totalGrade" checked={selectedFields.grades.includes("totalGrade")} />}
                  label="Điểm tổng kết"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "grades")} value="practiceGrade" checked={selectedFields.grades.includes("practiceGrade")} />}
                  label="Điểm thực hành"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "grades")} value="projectGrade" checked={selectedFields.grades.includes("projectGrade")} />}
                  label="Điểm đồ án"
                />
              </FormGroup>
            </FormControl>
          </Box>

          {/* Right Side: Chart Type Selection */}
          <Box style={{ width: "30%" }}>
            <FormControl fullWidth>
              <h3 id="chart-type-label">Loại biểu đồ</h3>
              <FormControlLabel
                control={<Checkbox onChange={(e) => handleFieldChange(e, "chartTypes")} value="allChart" checked={selectedFields.chartTypes.length === 5} />}
                label="Tất cả"
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "chartTypes")} value="pie" checked={selectedFields.chartTypes.includes("pie")} />}
                  label="Biểu đồ tròn"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "chartTypes")} value="column" checked={selectedFields.chartTypes.includes("column")} />}
                  label="Biểu đồ cột"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "chartTypes")} value="scatter" checked={selectedFields.chartTypes.includes("scatter")} />}
                  label="Biểu đồ phân tán"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "chartTypes")} value="histogram" checked={selectedFields.chartTypes.includes("histogram")} />}
                  label="Biểu đồ phân phối"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "chartTypes")} value="radar" checked={selectedFields.chartTypes.includes("radar")} />}
                  label="Biểu đồ radar"
                />

              </FormGroup>
            </FormControl>
          </Box>

          <Box style={{ width: "30%" }}>
            <FormControl fullWidth>
              <h3 id="other-label">Khác</h3>
              <FormControlLabel
                control={<Checkbox onChange={(e) => handleFieldChange(e, "otherFields")} value="allOthers" checked={selectedFields.otherFields.length === 2} />}
                label="Tất cả"
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "otherFields")} value="classification" checked={selectedFields.otherFields.includes("classification")} />}
                  label="Xếp loại sinh viên"
                />
                <FormControlLabel
                  control={<Checkbox onChange={(e) => handleFieldChange(e, "otherFields")} value="passRate" checked={selectedFields.otherFields.includes("passRate")} />}
                  label="Tỉ lệ đậu/rớt"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Box>

        <Button disabled={isDisabledButton} variant="contained" onClick={generateChartData} style={{ marginTop: "20px" }}>Áp dụng</Button>
      </Modal>
    </Overlay>
  );
};

export default AnalyticConfig;