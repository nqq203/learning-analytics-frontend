"use client";
import styled from "styled-components";
import { useRouter } from "next/router";
import StudentResultLNO from "@/components/LearningOutcome/StudentResultLNO";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetail } from "@/redux/thunk/learningoutcomeThunk";

const LearningOutcomesContainer = styled.div`
    margin: auto;
    width: 97%;
    padding-block:20px;
    
    
    
`
const LearningOutComeContainerBody = styled.div`
  display:flex;
  flex-direction:column;
  gap:1rem;

`
const LearningOutComeHeader = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between ;
  padding-bottom:10px;
  align-items:center;
`

const LearningOutComeItemsContainer = styled.div`
  display:flex;
  flex-direction:row;
  gap:20px;
`
const LineDivider = styled.div`
  background-color: var(--grey-600);
  height:1px;
  width:100%;
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

const NextBtn = styled.div`
    padding-block:0.8rem;
    padding-inline:1rem;
    color:white;
    font-size:1rem;
    background-color:var(--blue-600);
    border:none;
    border-radius:10px;
    font-weight:bold;
    cursor:pointer;
    &:hover{
        background-color:var(--blue-700);
    }
    &:active{
    
        background-color:var(--blue-800);
    }

`

export default function StudentAnalytics() {
    const {courseInfo,grades,studentInfo} = useSelector(state=>state.learningoutcome);
    const dispatch = useDispatch();
    const [userID,setUserID] = useState("123")
    const router = useRouter();
    const { classID, studentID } = router.query;
    useEffect( () =>{
      
              const fetchStudentRow = async() =>{
                  await dispatch(fetchStudentDetail({userId: "I1132",classId:classID,studentId:studentID}))
              }
              fetchStudentRow();
            },[router.query,classID,studentID])

    const courseInfo_Student = useMemo(() => {
          
          return courseInfo || [];
        }, [courseInfo]);

    const grades_Student = useMemo(() => {

          return grades || [];
        }, [grades]);
    
    const studentInfo_Student = useMemo(() => {
          
          return studentInfo || [];
        }, [studentInfo]);
    

    return (
      < LearningOutcomesContainer key={studentID}>
      
      
            <LearningOutComeContainerBody>
              <LearningOutComeHeader>
      
                <LearningOutComeItemsContainer>
                  
                  <DropdownTitleContainer>
                    <DropdownTitle>
                        Môn:
                    
                    </DropdownTitle>

                    <DropdownTitleSelect disabled>
                        <option>{courseInfo_Student.courseName}</option>
                    </DropdownTitleSelect>



                  </DropdownTitleContainer>

                  <DropdownTitleContainer>
                    <DropdownTitle>
                        Lớp:
                    </DropdownTitle>

                    <DropdownTitleSelect disabled>
                        <option>{courseInfo_Student.className}</option>
                    </DropdownTitleSelect>
                  
                  </DropdownTitleContainer>

                </LearningOutComeItemsContainer>
      



                <NextBtn>Tiếp tục</NextBtn>
              </LearningOutComeHeader>
      
      
              <LineDivider></LineDivider>

                <StudentResultLNO userId={userID} studentID={studentID} classID={classID} studentInfo={studentInfo_Student} studentGrade={grades_Student}></StudentResultLNO>
                
              
      
             </LearningOutComeContainerBody>
            </LearningOutcomesContainer>
    );
  }