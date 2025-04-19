"use client";

import styled from "styled-components";
import MyGaugeChart from "./GaugeChartLNO";
import TableChart from "./TableChartLNO";
import BarChart from "./BarChartLNO";


const LearningOutcomeBody = styled.div`
  display:flex;
  flex-direction: column;
  gap:1rem;
  
`
const DropdownTitleContainer = styled.div`

    display:flex;
    flex-direction:row;
    gap:0.5rem;
    align-items:center;
`
const DropdownTitle = styled.div`
    font-weight:bold;
    font-size:1rem;
`
const DropdownTitleSelect = styled.select`
    padding-inline:1rem;
    padding-block:0.5rem;
    
    font-weight:bold;
    font-size:1rem;

    background-color: var(--grey-200);
    color: var(--grey-900);


    border: 1px solid gray;
    border-radius:5px;
`

const ChartContainer = styled.div`

    width:100%,
    display:flex;
    flex-direction:column;
    

`
const ChartContainer1 = styled.div`
    display:flex;
    
    flex-direction:row;
    gap:1.5rem;

`

const ChartBox = styled.div`
    box-shadow:0 1px 5px rgba(0, 0, 0, 0.25);
    background-color:white;
    width:50%;
    display:flex;
    flex-direction:column;
    padding:2rem;
    text-align:center;
    align-items:center;
    
    border-radius:10px;

`
const BarChartContainer1 = styled.div`
    margin:auto;

`

const BarChartBox=styled.div`

    box-shadow:0 1px 5px rgba(0, 0, 0, 0.25);
    background-color:white;
    width:100%;
    padding:2rem;
    padding-inline:5rem;
    text-align:center;
    align-items:center;
    justify-content:center;
    border-radius:10px;


`

const titleChart = styled.div`
    font-size:1.5rem;
    font-weight:bold;
    text-align:left;


`

export default function StudentResultLNO({userId,studentID,classID,studentInfo,studentGrade}){


    const studentScore = 6.5;
    return(

        <>
        
            <LearningOutcomeBody>

                <DropdownTitleContainer>
                    <DropdownTitle>
                        MSSV - Họ tên:
                    
                    </DropdownTitle>

                    <DropdownTitleSelect disabled>
                        <option>{`${studentInfo.studentId} - ${studentInfo.fullName}`}</option>
                    </DropdownTitleSelect>



                  </DropdownTitleContainer>



                <ChartContainer>
                    <ChartContainer1>
                        <ChartBox>
                        <h2 style={{textAlign:"left",marginBottom:"1rem"}}>Loại xếp hạng của sinh viên</h2>
                            <MyGaugeChart value={studentGrade.finalGrade} >



                            </MyGaugeChart>

                        </ChartBox>



                        <ChartBox>
                        <h2 style={{textAlign:"left",marginBottom:"1rem"}}>Điểm của sinh viên</h2>
                            <TableChart studentGrade={studentGrade}>

                            </TableChart>
                        </ChartBox>
                    
                    
                    </ChartContainer1>


                    
                
                
                
                </ChartContainer>

                <BarChartContainer1>
                    
                        <BarChartBox>
                        <h2 style={{textAlign:"left",marginBottom:"1rem"}}>Thống kê điểm</h2>
                            <BarChart studentGrade={studentGrade}></BarChart>
                        </BarChartBox>
                    
                </BarChartContainer1>



            </LearningOutcomeBody>
        
        </>
    )
}