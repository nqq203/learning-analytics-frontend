import "../styles/LearningOutCome.css"
import FilterBoard from "./FilterBoard";
import { IoEyeSharp } from "react-icons/io5";
import styled from "styled-components";
import { useState, useEffect } from "react";
const LearningOutcomeBody = styled.div`
  display:flex;
  flex-direction: column;
  gap:1rem;
  
`

const TableContainer = styled.div`
    
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    height:600px;
    overflow-y:auto;
`
const NoContent = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    font-size:1.5rem;
    font-weight:bold;


`
const TableHeader = ["STT","Môn","Lớp","Khóa","Tín Chỉ","Chương Trình","Chuyên ngành","Hành Động"];
const TableContent = [
    {
        "ID":"1",
        "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 1",
        "ClassName": "21CLC08",
        "ClassOf":2021,
        "Credit":4,
        "Semester":1,
        "Program":"Chất Lượng Cao",
        "Falculity":"Công nghệ thông tin",
        "Specialized":"Hệ Thống Thông Tin"
    }
    ,
    {
        "ID":"2",
        "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 2",
        "ClassName": "21CLC08",
        "ClassOf":2021,
        "Credit":4,
        "Semester":1,
        "Program":"Chất Lượng Cao",
        "Falculity":"Công nghệ thông tin",
        "Specialized":"Hệ Thống Thông Tin"
    }
    ,
    {
        "ID":"3",
        "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 3",
        "ClassName": "21CLC08",
        "ClassOf":2021,
        "Credit":4,
        "Semester":1,
        "Program":"Chất Lượng Cao",
        "Falculity":"Công nghệ thông tin",
        "Specialized":"Hệ Thống Thông Tin"
    }
    ,
    {
        "ID":"4",
        "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 4",
        "ClassName": "21CLC08",
        "ClassOf":2021,
        "Credit":4,
        "Semester":1,
        "Program":"Chất Lượng Cao",
        "Falculity":"Công nghệ thông tin",
        "Specialized":"Hệ Thống Thông Tin"
    }
    ,
    {
        "ID":"5",
        "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 5",
        "ClassName": "21CLC08",
        "ClassOf":2021,
        "Credit":4,
        "Semester":1,
        "Program":"Chất Lượng Cao",
        "Falculity":"Công nghệ thông tin",
        "Specialized":"Hệ Thống Thông Tin"
    }
    ,
    {
        "ID":"6",
        "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 6",
        "ClassName": "21CLC08",
        "ClassOf":2021,
        "Credit":4,
        "Semester":1,
        "Program":"Chất Lượng Cao",
        "Falculity":"Công nghệ thông tin",
        "Specialized":"Hệ Thống Thông Tin"
    }
    ,
    {
        "ID":"7",
        "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 7",
        "ClassName": "21CLC08",
        "ClassOf":2021,
        "Credit":4,
        "Semester":1,
        "Program":"Chất Lượng Cao",
        "Falculity":"Công nghệ thông tin",
        "Specialized":"Hệ Thống Thông Tin"
    }
    ,
    {
        "ID":"8",
        "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 8",
        "ClassName": "21CLC08",
        "ClassOf":2021,
        "Credit":4,
        "Semester":1,
        "Program":"Chất Lượng Cao",
        "Falculity":"Công nghệ thông tin",
        "Specialized":"Hệ Thống Thông Tin"
    }




]





export default function SubjectListLNO({userID,classID,setSubjectID}){


    return(

        <>
            <LearningOutcomeBody>
            
            
                      <div className="LearningOutComeTabFilterBody-Container">
                        <FilterBoard></FilterBoard>
                      </div>
            
                      <TableContainer>
                        <table className="tableLNO">
                          <thead className="thTable">
                              <tr className="trTable">  
                                  {TableHeader.map((TableHeaderItems,index)=>{
                                    return <th className="thTable" key={index}> {TableHeaderItems}</th>;
                                  })}
                              </tr>
                          </thead>
                        {
                            TableContent.length>0? //HANDLE KO CO DATA NE

                          <tbody className="tbodyTable">
            
                            {TableContent.map((items,index)=>{
                              return<>
                                <tr className="trTable" key={index}>
                                    <td className="tdTable">{index+1}</td>
                                    <td className="tdTable">{items.SubjectName}</td>
                                    <td className="tdTable">{items.ClassName}</td>
                                    <td className="tdTable">{items.Credit}</td>
                                    <td className="tdTable">{items.Semester}</td>
                                    <td className="tdTable">{items.Program}</td>
                                    <td className="tdTable">{items.Falculity}</td>
                                    <td className="tdTable" onClick={()=>setSubjectID(items.ID)}>
                                      <IoEyeSharp id="eye-icon" ></IoEyeSharp>
                                    </td>
            
                                  </tr>
                                </>
                            })}
            
                          </tbody>
                          :
                          <NoContent>
                            Chưa có dữ liệu
                            </NoContent>
                        }
                      </table>

                    </TableContainer>
                      
                    </LearningOutcomeBody>
        
        
        
        </>
    )



}